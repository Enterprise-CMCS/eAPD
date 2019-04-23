
#!/bin/bash

# Expects the following environment variables to already be set:
#
#   AWS_PROD_API_AMI - Image ID of the AMI to use for the new instance
#
#   AWS_PROD_API_DATABASE_URL - PostgreSQL database URL the API should use.
#                               This is written into the API's configuration
#
#   AWS_PROD_API_PORT - The port the API should listen on. The load balancer
#                       will redirect internet traffic to this port. This
#                       is written into the API's configuration as well.
#
#   AWS_PROD_API_REGION - The AWS region the instance should be created in
#
#   AWS_PROD_API_SECURITY_GROUP - ID of the security group for the instance
#
#   AWS_PROD_API_SESSION_SECRET - The secret key used to sign session tokens.
#                                 This is written into the API's configuration.
#
#   AWS_PROD_API_SUBNET - ID of the subnet this instance should be attached to
#
#   AWS_PROD_API_TARGET_GROUP_ARN - The ARN of the target group to add the
#                                   instance to.

# Exit when any command fails
set -e

function deployAPItoEC2() {
  # Create PM2 ecosystem file using CI/CD environment and inject it into
  # EC2 run-instances user data file
  addEcosystemToUserData

  # Configure AWS CLI with defaults
  configureAWS

  # Get the instance ID of the current API EC2 instance, so we can delete it later
  PREV_INSTANCE_ID=$(getCurrentTargetGroupInstanceID)
  echo "• Found previous instance $PREV_INSTANCE_ID"

  # Create new EC2 instance
  INSTANCE_ID=$(createNewInstance)
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

  # Once the new instance is healthy, we can take the old instance out of the
  # ELB target group.
  removeInstanceFromTargetGroup $PREV_INSTANCE_ID
  echo "• Removed previous instance $PREV_INSTANCE_ID from ELB target group"

  # And finally, we terminate it.
  terminateInstance $PREV_INSTANCE_ID
  echo "• Terminated previous instance $PREV_INSTANCE_ID"
}

# Reads deployment ecosystem data from the environment, builds a PM2
# ecosystem configuration document, encodes it in base 64, and injects
# it into the user-data script.  Also injects the database URL in place
# of __DB_URL__
#
# Expects global environment variables:
#   AWS_PROD_API_PORT - port the API should listen on
#   AWS_PROD_API_DATABASE_URL - PostgreSQL database URL the API should use
#   AWS_PROD_API_SESSION_SECRET - The secret key used to sign session tokens
function addEcosystemToUserData() {
  ECOSYSTEM=`echo "module.exports = {
    apps : [{
      name: 'eAPD API',
      script: 'main.js',

      instances: 1,
      autorestart: true,
      env: {
        NODE_ENV: 'production',
        PORT: '$AWS_PROD_API_PORT',
        DATABASE_URL: '$AWS_PROD_API_DATABASE_URL',
        SESSION_SECRET: '$AWS_PROD_API_SESSION_SECRET'
      },
    }]
  };" | base64 -w 0`

  sed -i'.backup' -e "s/__ECOSYSTEM__/`echo $ECOSYSTEM`/g" aws.user-data.sh

  # Use vertical pipes as sed delimiters instead of slashes, since the database
  # URL can contain slashes itself.
  sed -i'.backup' -e "s|__DB_URL__|\"`echo $AWS_PROD_API_DATABASE_URL`\"|g" aws.user-data.sh

  rm aws.user-data.sh.backup
}

# Add an EC2 instance to the ELB target group.
#
# $1 - The EC2 instance ID to add to the target group
#
# Expects global environment variable:
#   AWS_PROD_API_PORT - Port the EC2 instance is listening on
#   AWS_PROD_API_TARGET_GROUP_ARN - The ARN of the target group to add the
#     instance to.
function addInstanceToTargetGroup() {
  aws elbv2 register-targets \
    --target-group-arn $AWS_PROD_API_TARGET_GROUP_ARN \
    --targets Id=$1,Port=$AWS_PROD_API_PORT \
    > /dev/null
}

# Sets up AWS global configuration for all subsequent commands.
#
# Expects global environment variables:
#   AWS_PROD_API_REGION - The AWS region to use
function configureAWS() {
  aws configure set default.region $AWS_PROD_API_REGION
}

# Create a new EC2 instance. Echos the new instance ID.
#
# Expects global environment variables:
#   AWS_PROD_API_AMI - Image ID of the AMI to use for this instance
#   AWS_PROD_API_SECURITY_GROUP - ID of the security group for this instance
#   AWS_PROD_API_SUBNET - ID of the subnet this instance should be attached to
function createNewInstance() {
  aws ec2 run-instances \
    --instance-type c4.large \
    --image-id $AWS_PROD_API_AMI \
    --security-group-ids $AWS_PROD_API_SECURITY_GROUP \
    --subnet-id $AWS_PROD_API_SUBNET \
    --ebs-optimized \
    --tag-specification "ResourceType=instance,Tags=[{Key=Name,Value=eapd-prod-auto}]" \
    --user-data file://aws.user-data.sh \
    | jq -r -c '.Instances[0].InstanceId'
}

# Get the EC2 instance ID of the instance currently in the ELB target group.
# Echos the instance ID.
#
# Expects global environment variables:
#   AWS_PROD_API_TARGET_GROUP_ARN - The ARN of the target group to check
function getCurrentTargetGroupInstanceID() {
  aws elbv2 describe-target-health \
    --target-group-arn $AWS_PROD_API_TARGET_GROUP_ARN \
    --query 'TargetHealthDescriptions[*].Target.Id' \
    | jq -r -c '.[0]'
}

# Gets the target health for an EC2 instance in an ELB target group
#
# $1 - ID of the EC2 instance to wait for
#
# Expects global environment variables:
#   AWS_PROD_API_PORT - Port the EC2 instance is listening on
#   AWS_PROD_API_TARGET_GROUP_ARN - The ARN of the target group to remove the
#     instance from.
function getTargetHealth() {
  aws elbv2 describe-target-health \
    --target-group-arn $AWS_PROD_API_TARGET_GROUP_ARN \
    --targets Id=$1,Port=$AWS_PROD_API_PORT \
    | jq -r -c '.TargetHealthDescriptions[0].TargetHealth.State'
}

# Remove an EC2 instance from the ELB target group.
#
# $1 - ID of the EC2 instance to remove
#
# Expects global environment variables:
#   AWS_PROD_API_PORT - Port the EC2 instance is listening on
#   AWS_PROD_API_TARGET_GROUP_ARN - The ARN of the target group to remove the
#     instance from.
function removeInstanceFromTargetGroup() {
  aws elbv2 deregister-targets \
    --target-group-arn $AWS_PROD_API_TARGET_GROUP_ARN \
    --targets Id=$1,Port=$AWS_PROD_API_PORT \
    > /dev/null
}

# Terminate an EC2 instance
#
# $1 - ID of the EC2 instance to terminate
function terminateInstance() {
  aws ec2 terminate-instances \
    --instance-ids $1 \
    > /dev/null
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
# Expects global environment variables:
#   AWS_PROD_API_PORT - Port the EC2 instance is listening on
#   AWS_PROD_API_TARGET_GROUP_ARN - The ARN of the target group to remove the
#     instance from.
function waitForTargetToBeHealthy() {
  HEALTH_CHECK_COUNT=1
  TARGET_HEALTH=$(getTargetHealth $1)
  while [[ "$TARGET_HEALTH" != "healthy" && "HEALTH_CHECK_COUNT" -lt 10 ]]; do
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

deployAPItoEC2