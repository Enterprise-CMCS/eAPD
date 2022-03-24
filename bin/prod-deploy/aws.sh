#!/bin/bash

# Call with the following arguments:
#    --API_AWS_ACCESS_KEY_ID          | AWS key used for read/write to S3
#                                     |----------------------------------------
#    --API_AWS_SECRET_ACCESS_KEY      | AWS key used for read/write to S3
#                                     |----------------------------------------
#    --API_DATABASE_URL <psql url>    | PostgreSQL database URL the API should
#                                     | use. This is written into the API's
#                                     | configuration.
#                                     |----------------------------------------
#    --API_FILE_S3_BUCKET <name>      | The name of the S3 bucket the API will
#                                     | read and write files to. ONLY the name,
#                                     | NOT the S3 URI.
#                                     |----------------------------------------
#    --API_PBKDF2_ITERATIONS <number> | Number of PBKDF2 iterations the server
#                                     | should use for hashing user passwords.
#                                     |----------------------------------------
#    --API_PORT <API server port>     | The port the API should listen on. The
#                                     | load balancer will redirect internet
#                                     | traffic to this port. This is written
#                                     | into the API's configuration as well.
#                                     |----------------------------------------
#    --API_SESSION_SECRET <secret key | The secret key used to sign session
#                                     | tokens. This is written into the API's
#                                     | configuration.
#                                     |----------------------------------------
#    --AWS_REGION <AWS region name>   | The AWS region the instance should be
#                                     | created in
#                                     |----------------------------------------
#    --AWS_SECURITY_GROUP <group ID>  | ID of the security group for the
#                                     | instance
#                                     |----------------------------------------
#    --AWS_SUBNET <subnet ID>         | ID of the subnet this instance should
#                                     | be attached to
#                                     |----------------------------------------
#    --AWS_TARGET_GROUP <AWS ARN>     | The ARN of the target group to add the
#                                     | instance to.
#                                     |----------------------------------------
#    --BUILD_URL <URL>                | The URL to the zip file containing the
#                                     | built API. This zip will be pulled into
#                                     | the EC2 instance and launched.
#                                     |----------------------------------------
#    --ENVIRONMENT <env name>         | Environment being deployed, lowercase.
#                                     | This is used to tag the EC2 instance
#                                     | and find previous instances for the
#                                     | same environment. "production" or
#                                     | "staging".

# Exit when any command fails
set -e

function deployAPItoEC2() {
  # Adds the URL to the build artifacts to the user data file, so we can
  # download it when the EC2 instance starts up
  addBuildUrlToUserData

  # Create PM2 ecosystem file using CI/CD environment and inject it into
  # EC2 run-instances user data file
  addEcosystemToUserData

  # Configure AWS CLI with defaults
  configureAWS

  # Get the instance IDs of the current API EC2 production instances, so we can 
  # delete them later
  PREV_INSTANCE_INFOS=$(findExistingInstances)
  echo "• Found previous instances: $PREV_INSTANCE_INFOS"

  AMI_ID=$(findAMI)
  echo "• Using most recent EAST-RH AMI: $AMI_ID"

  # Create new EC2 instance
  INSTANCE_ID=$(createNewInstance $AMI_ID)
  echo "• Created instance $INSTANCE_ID"

  # Wait for the instance to become ready.  This will happen once the VM is
  # networkically available, which isn't strictly useful to us, but it's as
  # good an indication as we'll get that the machine is ready to do stuff.
  echo "• Waiting for instance to be ready"
  waitForInstanceToBeReady $INSTANCE_ID

  # Once the instance is networkically ready, add it to our ELB target group
  addInstanceToTargetGroup $INSTANCE_ID
  echo "• Added instance $INSTANCE_ID to ELB target group"

  # After the instance is added to the target group, the target group will start
  # performing health checks. Because our user-data script may not be finished
  # yet, the instance is likely to start off being unhealthy. Wait until it
  # becomes healthy or for 10 minutes.
  echo "• Waiting for target to be healthy"
  waitForTargetToBeHealthy $INSTANCE_ID

  echo "• Checking availability of Frontend"
  if [[ $ENVIRONMENT == "production" ]]; then
    while [[ "$(curl -s -o /dev/null -w %{http_code} https://eapd.cms.gov)" != "200" ]]; 
      do echo "• • Frontend currently unavailable" && sleep 60; 
    done
  elif [[ $ENVIRONMENT == "staging" ]]; then
    while [[ "$(curl -s -o /dev/null -w %{http_code} https://staging-eapd.cms.gov)" != "200" ]]; 
      do echo "• • Frontend currently unavailable" && sleep 60; 
    done
  else
    echo "Environment $ENVIRONMENT is invalid"
  fi

  # And finally, we terminate previous instances.
  while read -r PREV_INSTANCE_INFO; do
    BITS=(${PREV_INSTANCE_INFO//,/ })
    PREV_INSTANCE_ID=$(echo ${BITS[0]} | tr -d '"')
    terminateInstance $PREV_INSTANCE_ID
    echo "• Terminated previous instance $PREV_INSTANCE_ID"
  done <<< "$PREV_INSTANCE_INFOS"
}

function addBuildUrlToUserData() {
  sed -i'.backup' -e "s|__BUILDURL__|`echo $BUILD_URL`|g" aws.user-data.sh

  rm aws.user-data.sh.backup
}

# Reads deployment ecosystem data from the environment, builds a PM2
# ecosystem configuration document, encodes it in base 64, and injects
# it into the user-data script.
#
# Expects global variables:
#   API_AWS_ACCESS_KEY_ID - AWS key used for read/write to S3
#   API_AWS_SECRET_ACCESS_KEY - AWS key used for read/write to S3
#   API_PORT - port the API should listen on
#   API_DATABASE_URL - PostgreSQL database URL the API should use
#   API_FILE_S3_BUCKET - S3 bucket name for reading/writing files
#   API_PBKDF2_ITERATIONS - Number of iterations for hashing passwords
#   API_SESSION_SECRET - The secret key used to sign session tokens
function addEcosystemToUserData() {
  ECOSYSTEM=`echo "module.exports = {
    apps : [{
      name: 'eAPD API',
      script: 'main.js',
      instances: 1,
      autorestart: true,
      error_file: '/app/api/logs/eAPD-API-error-0.log',
      out_file: '/app/api/logs/eAPD-API-out-0.log',
      env: {
        AWS_ACCESS_KEY_ID: '$API_AWS_ACCESS_KEY_ID',
        AWS_SECRET_ACCESS_KEY: '$API_AWS_SECRET_ACCESS_KEY',
        AUTH_LOCK_FAILED_ATTEMPTS_COUNT: 5,
        AUTH_LOCK_FAILED_ATTEMPTS_WINDOW_TIME_MINUTES: 1,
        AUTH_LOCK_FAILED_ATTEMPTS_DURATION_MINUTES: 30,
        FILE_STORE: 's3',
        FILE_S3_BUCKET: '$API_FILE_S3_BUCKET',
        NODE_ENV: 'production',
        PBKDF2_ITERATIONS: '$API_PBKDF2_ITERATIONS',
        PORT: '$API_PORT',
        DATABASE_URL: '$API_DATABASE_URL',
        SESSION_SECRET: '$API_SESSION_SECRET',
        PROXY_TRUST: 'true',
        OKTA_DOMAIN: '$OKTA_DOMAIN',
        OKTA_SERVER_ID: '$OKTA_SERVER_ID',
        OKTA_CLIENT_ID: '$OKTA_CLIENT_ID',
        OKTA_API_KEY: '$OKTA_API_KEY',
        JWT_SECRET: '$JWT_SECRET',
        MONGO_DATABASE: '$MONGO_DATABASE',
        MONGO_URL: '$MONGO_URL'

      },
    },{
      name: 'Database migration',
      script: 'yarn',
      args: 'run migrate',
      autorestart: false,
      error_file: '/app/api/logs/Database-migration-error.log',
      out_file: '/app/api/logs/Database-migration-out.log',
      env: {
        NODE_ENV: 'production',
        DATABASE_URL: '$API_DATABASE_URL',
        OKTA_DOMAIN: '$OKTA_DOMAIN',
        OKTA_SERVER_ID: '$OKTA_SERVER_ID',
        OKTA_API_KEY: '$OKTA_API_KEY',
        JWT_SECRET: '$JWT_SECRET',
        MONGO_DATABASE: '$MONGO_DATABASE',
        MONGO_URL: '$MONGO_URL'
      }
    },{
      name: 'Database seeding',
      script: 'yarn',
      args: 'run seed',
      autorestart: false,
      error_file: '/app/api/logs/Database-seeding-error.log',
      out_file: '/app/api/logs/Database-seeding-out.log',
      env: {
        NODE_ENV: 'production',
        DATABASE_URL: '$API_DATABASE_URL',
        OKTA_DOMAIN: '$OKTA_DOMAIN',
        OKTA_SERVER_ID: '$OKTA_SERVER_ID',
        OKTA_API_KEY: '$OKTA_API_KEY',
        JWT_SECRET: '$JWT_SECRET',
        MONGO_DATABASE: '$MONGO_DATABASE',
        MONGO_URL: '$MONGO_URL'
      }
    }]
  };" | base64 -w 0`

  sed -i'.backup' -e "s|__ECOSYSTEM__|`echo $ECOSYSTEM`|g" aws.user-data.sh

  sed -i'.backup' -e "s|__ENVIRONMENT__|`echo $ENVIRONMENT`|g" aws.user-data.sh

  sed -i'.backup' -e "s|__NEW_RELIC_LICENSE_KEY__|`echo $NEW_RELIC_LICENSE_KEY`|g" aws.user-data.sh

  rm aws.user-data.sh.backup
}

# Add an EC2 instance to the ELB target group.
#
# $1 - The EC2 instance ID to add to the target group
#
# Expects global variable:
#   API_PORT - Port the EC2 instance is listening on
#   AWS_TARGET_GROUP	 - The ARN of the target group to add the instance to
function addInstanceToTargetGroup() {
  aws elbv2 register-targets \
    --target-group-arn $AWS_TARGET_GROUP \
    --targets Id=$1,Port=$API_PORT \
    > /dev/null
}

# Sets up AWS global configuration for all subsequent commands.
#
# Expects global variable:
#   AWS_REGION - The AWS region to use
function configureAWS() {
  aws configure set default.region $AWS_REGION
}

# Create a new EC2 instance. Echos the new instance ID.
#
# $1 - Image ID of the AMI to use for this instance
#
# Expects global variables:
#   AWS_SECURITY_GROUP - ID of the security group for this instance
#   AWS_SUBNET - ID of the subnet this instance should be attached to
#   ENVIRONMENT - name of the environment being deployed to; lowercase
function createNewInstance() {
  aws ec2 run-instances \
    --instance-type c4.large \
    --image-id $1 \
    --security-group-ids $AWS_SECURITY_GROUP \
    --subnet-id $AWS_SUBNET \
    --ebs-optimized \
    --key-name tforkner_eapd \
    --tag-specification "ResourceType=instance,Tags=[{Key=Name,Value=eAPD $ENVIRONMENT},{Key=environment,Value=$ENVIRONMENT},{Key=cms-cloud-exempt:open-sg,Value=CLDSPT-5877}]" \
    --user-data file://aws.user-data.sh \
    | jq -r -c '.Instances[0].InstanceId'
}

# Finds the most recent EAST-RH gold AMI and returns the ID
function findAMI() {
  aws ec2 describe-images \
    --query 'Images[*].{id:ImageId,name:Name,date:CreationDate}' \
    --filter 'Name=is-public,Values=false' \
    --filter 'Name=name,Values=EAST-RH 7-*Gold*(HVM)*' \
    | jq -r -c 'sort_by(.date)|last|.id'
}

# Finds any existing instances for the environment. Echos a newline-delimited
# list of instance IDs and names.  E.g.:
#
# "instance-id-1","instance-name-1"
# "instance-id-2","instance-name-2"
#
# Expects global variables:
#   ENVIRONMENT - name of the environment being deployed to; lowercase
function findExistingInstances() {
  aws ec2 describe-instances \
    --filter "Name=tag:environment,Values=$ENVIRONMENT" \
    | jq -rc '.Reservations[].Instances[] | [.InstanceId, .Tags[].Value] | @csv'
}

# Gets the target health for an EC2 instance in an ELB target group
#
# $1 - ID of the EC2 instance to wait for
#
# Expects global  variables:
#   API_PORT - Port the EC2 instance is listening on
#   AWS_TARGET_GROUP - The ARN of the target group to remove the instance from.
function getTargetHealth() {
  aws elbv2 describe-target-health \
    --target-group-arn $AWS_TARGET_GROUP \
    --targets Id=$1,Port=$API_PORT \
    | jq -r -c '.TargetHealthDescriptions[0].TargetHealth.State'
}

# Terminate an EC2 instance
#
# $1 - ID of the EC2 instance to terminate
function terminateInstance() {
  # This command can fail if AWS doesn't recognize the instance ID, but in that
  # case we really, really don't care; so don't stop the script if it errors.
  set +e
  aws ec2 terminate-instances \
    --instance-ids $1 \
    > /dev/null
  # Switch back to stop-on-error mode
  set -e
}

# Wait for EC2 instance status checks to be "passed"
#
# $1 - ID of the EC2 instance to wait for
function waitForInstanceToBeReady() {
  INSTANCE_CHECK_COUNT=1
  INSTANCE_STATUS=$(aws ec2 describe-instance-status --instance-ids $1)
  INSTANCE_CHECK1=$(echo $INSTANCE_STATUS | jq -r -c '.InstanceStatuses[0].SystemStatus.Details[0].Status')
  INSTANCE_CHECK2=$(echo $INSTANCE_STATUS | jq -r -c '.InstanceStatuses[0].InstanceStatus.Details[0].Status')
  while [[ "$INSTANCE_CHECK1" != "passed" || "$INSTANCE_CHECK2" -ne "passed" ]]; do
    echo "  ...status check #$INSTANCE_CHECK_COUNT: not ready"
    sleep 30s
    INSTANCE_STATUS=$(aws ec2 describe-instance-status --instance-ids $1)
    INSTANCE_CHECK1=$(echo $INSTANCE_STATUS | jq -r -c '.InstanceStatuses[0].SystemStatus.Details[0].Status')
    INSTANCE_CHECK2=$(echo $INSTANCE_STATUS | jq -r -c '.InstanceStatuses[0].InstanceStatus.Details[0].Status')
    INSTANCE_CHECK_COUNT=$((INSTANCE_CHECK_COUNT+1))
  done
  echo "  ...status check #$INSTANCE_CHECK_COUNT: READY"
}

# Wait for an EC2 instance in the ELB target group to be healthy. Checks
# once per minute for up to 10 minutes.  If the target is not healthy
# after 10 minutes, exits the script with an error.
#
# $1 - ID of the EC2 instance to wait for
#
# Expects global variables:
#   API_PORT - Port the EC2 instance is listening on
#   AWS_TARGET_GROUP - The ARN of the target group to remove the instance from.
function waitForTargetToBeHealthy() {
  HEALTH_CHECK_COUNT=1
  TARGET_HEALTH=$(getTargetHealth $1)
  while [[ "$TARGET_HEALTH" != "healthy" && "HEALTH_CHECK_COUNT" -lt 60 ]]; do
    echo "  ...health check #$HEALTH_CHECK_COUNT: '$TARGET_HEALTH'"
    sleep 60s
    TARGET_HEALTH=$(getTargetHealth $1)
    HEALTH_CHECK_COUNT=$((HEALTH_CHECK_COUNT+1))
  done
  echo "  ...health check #$HEALTH_CHECK_COUNT: '$TARGET_HEALTH'"

  # If we bailed out after 10 minutes but the instance isn't healthy, bail out
  # of the script here
  if [[ "$TARGET_HEALTH" != "healthy" ]]
  then
    echo "ERROR: target is not healthy (status=$TARGET_HEALTH)"
    exit 1
  fi
}

# Iterate while there are arguments
while [ $# -gt 0 ]; do
  # If the argument begins with --, strip the -- to create the variable name
  # and then set it to the next argument
  if [[ $1 == *"--"* ]]; then
    v="${1/--/}"
    export $v="$2"
  fi

  # Remove the current argument
  shift
done

deployAPItoEC2
