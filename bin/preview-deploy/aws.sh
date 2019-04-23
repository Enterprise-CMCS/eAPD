#!/bin/bash
# Exit when any command fails
set -e

function print() {
  echo "$1" >&2
}

# Deploys a preview instance to EC2 with a fully self-contained environment.
#
# $1 - the pull request number
function deployPreviewtoEC2() {
  # Configure AWS CLI with defaults
  configureAWS

  # Find any existing preview deploys
  print "• Finding existing preview instances"
  EXISTING_INSTANCES=$(findExistingInstances $1)

  # Create new EC2 instance
  print "• Creating EC2 instance"
  INSTANCE_ID=$(createNewInstance $1)
  print "• Created instance $INSTANCE_ID"

  # Wait for the instance to become ready.  This will happen once the VM is
  # networkically available, which isn't strictly useful to us, but it's as
  # good an indication as we'll get that the machine is ready to do stuff.
  print "• Waiting for instance to be ready"
  waitForInstanceToBeReady $INSTANCE_ID

  print "• Getting public DNS name of new instance"
  PUBLIC_DNS=$(getPublicDNS $INSTANCE_ID)
  print "• Public address: $PUBLIC_DNS"

  print "• Cleaning up previous instances"
  while read -r INSTANCE_ID; do
    terminateInstance "$INSTANCE_ID"
  done <<< "$EXISTING_INSTANCES"

  echo "$PUBLIC_DNS"
}

# Creates zip files of the API and web app, base64 encodes them, and adds
# script at the top of the user data file to decode them back into files on
# the server.
function addZipsToUserData() {
  # Change directories to get rid of paths.  zip stores paths relative to the
  # directory where the zip command is run, which is maybe obnoxious?
  cd ../../web/dist
  zip -rq ../../bin/preview-deploy/webapp.zip *

  # Same with the API
  cd ../../api
  zip -rq ../bin/preview-deploy/api.zip *

  # Now come back where we started
  cd ../bin/preview-deploy
  
  echo '#!'"/bin/bash\n\necho '$(base64 webapp.zip)' | base64 --decode > webapp.zip\necho '$(base64 api.zip)' | base64 --decode > api.zip\n\n$(cat aws.user-data.sh)" > aws.user-data.sh
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
# $1 - the pull request number
#
# Expects global environment variables:
#   AWS_PROD_API_REGION - The AWS region the instance should be created in
#   AWS_PROD_API_AMI - Image ID of the AMI to use for this instance
#   AWS_PROD_API_SECURITY_GROUP - ID of the security group for this instance
#   AWS_PROD_API_SUBNET - ID of the subnet this instance should be attached to
function createNewInstance() {
  aws ec2 run-instances \
    --instance-type t2.medium \
    --image-id ami-0de53d8956e8dcf80 \
    --security-group-ids sg-0d0314e8cf261d9f6 \
    --subnet-id subnet-6c76f642 \
    --tag-specification "ResourceType=instance,Tags=[{Key=Name,Value=eapd-pr-$1}]" \
    --user-data file://aws.user-data.sh \
    | jq -r -c '.Instances[0].InstanceId'
}

# Finds any existing instances for previewing this PR
#
# $1 - the pull request number
function findExistingInstances() {
  aws ec2 describe-instances \
    --filter Name=tag:Name,Values=eapd-pr-$1 \
    --query "Reservations[*].Instances[*].InstanceId" \
    | jq -c -r '.[] | join("")'
}

# Get the public DNS name for an instance.
#
# $1 - ID of the EC2 instance to get the public DNS name for
function getPublicDNS() {
  aws ec2 describe-instances \
    --instance-ids $1 \
    | jq -r -c '.Reservations[0].Instances[0].PublicDnsName'
}

# Terminates a list of instances
#
# $1 - list of instance ID to delete
function terminateInstance() {
  print "  ...terminating existing instance: $1"
  aws ec2 terminate-instances \
    --instance-ids "$1"
}

# Wait for EC2 instance status checks to be "passed"
#
# $1 - ID of the EC2 instance to wait for
function waitForInstanceToBeReady() {
  sleep 10s
  INSTANCE_CHECK_COUNT=1
  INSTANCE_STATUS=$(aws ec2 describe-instance-status --instance-ids $1)
  INSTANCE_CHECK1=$(echo $INSTANCE_STATUS | jq -r -c '.InstanceStatuses[0].SystemStatus.Details[0].Status')
  INSTANCE_CHECK2=$(echo $INSTANCE_STATUS | jq -r -c '.InstanceStatuses[0].InstanceStatus.Details[0].Status')
  while [[ "$INSTANCE_CHECK1" != "passed" || "$INSTANCE_CHECK2" -ne "passed" ]]; do
    print "  ...status check #$INSTANCE_CHECK_COUNT: not ready"
    sleep 30s
    INSTANCE_STATUS=$(aws ec2 describe-instance-status --instance-ids $1)
    INSTANCE_CHECK1=$(echo $INSTANCE_STATUS | jq -r -c '.InstanceStatuses[0].SystemStatus.Details[0].Status')
    INSTANCE_CHECK2=$(echo $INSTANCE_STATUS | jq -r -c '.InstanceStatuses[0].InstanceStatus.Details[0].Status')
    INSTANCE_CHECK_COUNT=$((INSTANCE_CHECK_COUNT+1))
  done
  print "  ...status check #$INSTANCE_CHECK_COUNT: READY"
}

# $1 - pull request number
echo $(deployPreviewtoEC2 $1)
