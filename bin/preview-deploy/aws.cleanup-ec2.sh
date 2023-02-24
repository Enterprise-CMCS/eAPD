#!/bin/bash
# Call with the following arguments:
#    --AWS_REGION <AWS region name>   | The AWS region the instance should be
#                                     | created in

# Exit when any command fails
set -e

function configureAWS() {
  aws configure set default.region $AWS_REGION
}

# Finds all existing preview instances
function findExistingInstances() {
  aws ec2 describe-instances \
    --filter "Name=tag:environment,Values=preview" \
    | jq -rc '.Reservations[].Instances[] | [.InstanceId, (.Tags[] | (select(.Key == "github-pr") | .Value))] | @csv'
}

# Finds most recentely launched instance
#aws ec2 describe-instances --filters Name=tag-key,Values=github-pr --query 'sort_by(Reservations[].Instances[], &LaunchTime)[-1].InstanceId' --output text

# Find all tags for instances with the github-pr tag
# WIP needs to be refined
aws ec2 describe-tags --no-cli-pager --filters Name=key,Values=github-pr | jq -rc  ".Tags[].Value" |sort |uniq

#findExistingInstances

# {
#    "Reservations": [
#        {
#            "Groups": [],
#            "Instances": [
#                {
#                    "AmiLaunchIndex": 0,
#                    "ImageId": "ami-03bac4abc46a9ee2e",
#                    "InstanceId": "i-0120ef9b1284e4f06",