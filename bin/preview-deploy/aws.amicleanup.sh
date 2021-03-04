#!/bin/bash
################## WIP ##################

# Call with the following arguments:
#    --AWS_REGION <AWS region name>   | The AWS region the instance should be
#                                     | created in

# Exit when any command fails
set -e

# Deploys a preview instance to EC2 with a fully self-contained environment.
function cleanupPlatinumAMI() {
  # Configure AWS CLI with defaults
  configureAWS

  echo "• Finding available Platinum AMIs"
  getAvailableAMIs
  echo "• Checking for Platinum AMIs currently in use"
  checkAMIForUsage
  echo "• Checking for the most recently created Platinum AMI"
  getMostRecentAMI
  echo "• These AMIs have been deregistered because they are not most recent or in use"
  deregisterIfNotUsed
}

function configureAWS() {
  aws configure set default.region $AWS_REGION
}

# Finds all existing platinum AMIs
function getAvailableAMIs() {
  aws ec2 describe-images \
    --owner self \
    --filter 'Name=name,Values=eAPD Platinum AMI - *' \
    | jq -rc '.Images[].ImageId' 
}

# Finds all existing preview instances
#function findExistingInstances() {
#  aws ec2 describe-instances \
#    --filter "Name=tag:environment,Values=preview" \
#    | jq -rc '.Reservations[].Instances[] | [.InstanceId, (.Tags[] | (select(.Key == "github-pr") | .Value))] | @csv'
#}
function checkAMIForUsage() {
  AVAIL_AMIS=$(getAvailableAMIs)
  for AMI_ID in $AVAIL_AMIS
  do 
    aws ec2 describe-instances --filter Name=image-id,Values="$AMI_ID" | jq -rc '.Reservations[].Instances[] | .ImageId'
  done
}

function getMostRecentAMI() {
  aws ec2 describe-images --owners self --filters "Name=name,Values=eAPD Platinum AMI - *" --query 'sort_by(Images, &CreationDate)[-1].ImageId' --output text
}

function deregisterIfNotUsed() {
  AVAIL_AMIS=$(getAvailableAMIs)
  IN_USE_AMIS=$(checkAMIForUsage)
  MOST_RECENT_AMI=$(getMostRecentAMI)
  for AMI_ID in $AVAIL_AMIS
  do
    if [[ $AMI_ID == $IN_USE_AMIS ]] || [[ $AMI_ID == $MOST_RECENT_AMI ]]; then
      :
    else
      aws ec2 deregister-image --image-id $AMI_ID
    fi
  done
}
# Gets Instances based on AMI ID
#aws ec2 describe-instances --filter 'Name=image-id,Values=$AVAIL_AMIS'

# Gets all info on all available AMIs
#aws ec2 describe-images --filter 'Name=name,Values=eAPD Platinum AMI - *'

# Gets all available Platinum AMIs image-ids
#aws ec2 describe-images --filter 'Name=name,Values=eAPD Platinum AMI - *' | jq -rc '.Images[].ImageId'

# for available amis check if in use by instance and if not deregister


# for every AMI, check if its in use, if it is in use, print "in use" if it isn't in use print "not in use"

cleanupPlatinumAMI
