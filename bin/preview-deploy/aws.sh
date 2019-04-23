#!/bin/bash
# Exit when any command fails
set -e

# Deploys a preview instance to EC2 with a fully self-contained environment.
#
# $1 - the pull request number
function deployPreviewtoEC2() {
  echo "PR NUMBER $1"
  exit 0;

  # Create new EC2 instance
  echo "• Creating EC2 instance"
  INSTANCE_ID=$(createNewInstance $1)
  echo "• Created instance $INSTANCE_ID"

  # Wait for the instance to become ready.  This will happen once the VM is
  # networkically available, which isn't strictly useful to us, but it's as
  # good an indication as we'll get that the machine is ready to do stuff.
  echo "• Waiting for instance to be ready"
  waitForInstanceToBeReady $INSTANCE_ID

  echo "• Getting public DNS name of new instance"
  PUBLIC_DNS=$(getPublicDNS $INSTANCE_ID)
  echo "• Public address: $PUBLIC_DNS"
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
    --region us-east-1 \
    --instance-type t2.medium \
    --image-id ami-0de53d8956e8dcf80 \
    --security-group-ids sg-0d0314e8cf261d9f6 \
    --subnet-id subnet-6c76f642 \
    --tag-specification "ResourceType=instance,Tags=[{Key=Name,Value=eapd-pr-$1}]" \
    --user-data file://aws.user-data.sh \
    | jq -r -c '.Instances[0].InstanceId'
}

# Get the public DNS name for an instance.
#
# $1 - ID of the EC2 instance to get the public DNS name for
function getPublicDNS() {
  aws ec2 describe-instances \
    --instance-ids $1 \
    | jq -r -c '.Reservations[0].Instances[0].PublicDnsName'
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

deployPreviewtoEC2 $1
