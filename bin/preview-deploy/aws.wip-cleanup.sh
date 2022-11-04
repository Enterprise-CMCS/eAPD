#!/bin/bash
# Call with the following arguments:
#    --AWS_REGION <AWS region name>   | The AWS region the instance should be
#                                     | created in

# Exit when any command fails
set -e

# Deploys a preview instance to EC2 with a fully self-contained environment.
function cleanupPreviewAMI() {
  # Configure AWS CLI with defaults
  configureAWS
  
  printf "• Finding state of AWS environment\n"
  waitForAtRest
  printf "• Finding available Preview AMIs\n"
  getAvailableAMIs
  printf "• Checking for Preview AMIs currently in use\n"
  checkAMIForUsage |uniq
  printf "• Checking for the most recently created Preview AMI\n"
  getMostRecentAMI
  printf "• AMI actions being taken\n"
  deregisterIfNotUsed
}

function configureAWS() {
  aws configure set default.region $AWS_REGION
}

# Finds all existing Preview AMIs
function getAvailableAMIs() {
  aws ec2 describe-images \
    --owner self \
    --filter 'Name=name,Values=eAPD Preview *' \
    | jq -rc '.Images[].ImageId' 
}

function checkAMIForUsage() {
  AVAIL_AMIS=$(getAvailableAMIs)
  for AMI_ID in $AVAIL_AMIS
  do 
    aws ec2 describe-instances \
      --filter Name=image-id,Values="$AMI_ID" \
      | jq -rc '.Reservations[].Instances[] | .ImageId'
  done
}

function getMostRecentAMI() {
  echo $(aws ec2 describe-images \
    --owners self \
    --filters "Name=name,Values=eAPD Preview *" \
    --query 'sort_by(Images, &CreationDate)[-1].ImageId' \
    --output text)
}

function deregisterIfNotUsed() {
  AVAIL_AMIS=$(getAvailableAMIs)
  IN_USE_AMIS=$(checkAMIForUsage)
  MOST_RECENT_AMI=$(getMostRecentAMI)
  for AMI_ID in $AVAIL_AMIS
  do
    if [[ $IN_USE_AMIS =~ $AMI_ID ]] || [[ $AMI_ID == $MOST_RECENT_AMI ]]; then ### This keeps both most recent and in use AMIs
      printf "Keeping $AMI_ID\n"
    else
      echo "$AMI_ID would be deregistered"
#      aws ec2 deregister-image --image-id $AMI_ID
#      printf "Deregistering $AMI_ID\n"
    fi
  done
}

# Gets State of Instances"
function getInMotionInstanceIds() {
  aws ec2 describe-instances \
    --filter "Name=instance-state-name,Values=pending,rebooting,stopping,shutting-down" \
    | jq -rc '.Reservations[].Instances[].State.Name'
}

# This function is to make sure the environment is at rest
# No pending, stopping, rebooting Instances
function waitForAtRest() {
  INMOTION_INSTANCES=$(getInMotionInstanceIds)
  sleep 15
  while [[ $INMOTION_INSTANCES == "pending" ]] || [[ $INMOTION_INSTANCES == "rebooting" ]] || [[ $INMOTION_INSTANCES == "stopping" ]] || [[ $INMOTION_INSTANCES == "shutting-down" ]]; do
    printf "There are in motion Instances\n"
    sleep 300
  done

  printf "There are no Instances in motion\n"
}

cleanupPreviewAMI