#!/bin/bash

# Call with the following arguments:
#    --AWS_REGION <AWS region name>   | The AWS region the instance should be
#                                     | created in
#                                     |----------------------------------------
#    --GH_BOT_TOKEN <token>           | Personal access token for the Github
#                                     | user to update comments as
#                                     |----------------------------------------
#    --GH_BOT_USER <username>         | Username of the Github user to update
#                                     | comments as. These are the comments
#                                     | that say the preview deploy was removed

# Exit when any command fails
set -e

# Deploys a preview instance to EC2 with a fully self-contained environment.
function cleanupPreviewDeploys() {
  # Configure AWS CLI with defaults
  configureAWS

  echo "• Finding open pull requests"
  OPEN_PRS=$(getOpenPullRequests)
  for PR in $OPEN_PRS
  do
    echo "  ...$PR"
  done

  # Find any existing preview deploys
  echo "• Finding existing preview instances"
  EXISTING_INSTANCES=$(findExistingInstances)

  echo "• Terminating instances for closed/merged pull requests"
  while read -r INSTANCE_INFO; do
    terminateIfClosedPR $INSTANCE_INFO "$OPEN_PRS"
  done <<< "$EXISTING_INSTANCES"
}

# Sets up AWS global configuration for all subsequent commands.
#
# Expects global environment variables:
#   PRODUCTION_AWS_REGION - The AWS region to use
function configureAWS() {
  aws configure set default.region $AWS_REGION
}

# Finds all existing preview instances
function findExistingInstances() {
  aws ec2 describe-instances \
    --filter "Name=tag:environment,Values=preview" \
    | jq -rc '.Reservations[].Instances[] | [.InstanceId, (.Tags[] | (select(.Key == "github-pr") | .Value))] | @csv'
}

# Gets a list of open pull requests
function getOpenPullRequests() {
  curl -s \
    https://api.github.com/repos/Enterprise-CMCS/eAPD/pulls\?state\=open \
    | jq -rc ".[].number"
}

# Terminates a list of instances
#
# $1 - instance info
# $2 - list of open pull requests
function terminateIfClosedPR() {
  BITS=(${1//,/ })
  INSTANCE_ID=$(echo ${BITS[0]} | tr -d '"')
  INSTANCE_PR=$(echo ${BITS[1]} | tr -d '"')

  # If there's not an instance ID, bail out. This can happen if there aren't any
  # active preview deployments.
  if [ -z "$INSTANCE_ID" ]; then
    return 0
  fi

  echo "  ...instance $INSTANCE_ID is for PR $INSTANCE_PR";

  for PR in $2
  do
    if [ "$INSTANCE_PR" == "$PR" ]; then
      echo "  ...pull request is still open; skipping"
      return 0
    fi
  done
  echo "  ...pull request is closed; terminating"

  aws ec2 terminate-instances \
    --instance-ids "$INSTANCE_ID" \
    > /dev/null

  echo "  ...updating Github comment"
  updateGithubComment $INSTANCE_PR
}

# Updates the Github comment with the preview link, if applicable, to say
# that the deployment has been cleaned up.
#
# $1 - pull request number
function updateGithubComment() {
  COMMENTS=$(curl -s -H "Authorization: token $GH_BOT_TOKEN" https://api.github.com/repos/CMSgov/eAPD/issues/$1/comments | jq -c -r '.[] | {id:.id,user:.user.login}' | grep "$GH_BOT_USER" || true)
  if [ "$COMMENTS" ]; then
    ID=$(echo "$COMMENTS" | jq -c -r .id)
    curl -s \
      -H "Authorization: token $GH_BOT_TOKEN" \
      -H "Content-Type: application/json" \
      -d '{"body":"This deploy was cleaned up."}' \
      -X PATCH "https://api.github.com/repos/CMSgov/eAPD/issues/comments/$ID"
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

cleanupPreviewDeploys