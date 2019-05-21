#!/bin/bash
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

  echo "• Terminating instances for closed/merged pull requests"
  while read -r INSTANCE_INFO; do
    terminateIfClosedPR $INSTANCE_INFO "$OPEN_PRS"
  done <<< "$EXISTING_INSTANCES"
}

# Sets up AWS global configuration for all subsequent commands.
#
# Expects global environment variables:
#   AWS_PROD_API_REGION - The AWS region to use
function configureAWS() {
  aws configure set default.region $AWS_PROD_API_REGION
}

# Finds any existing instances for previewing this PR
function findExistingInstances() {
  aws ec2 describe-instances \
    --filter "Name=tag:Name,Values=eapd-pr-*" \
    | jq -rc '.Reservations[].Instances[] | [.InstanceId, .Tags[].Value] | @csv'
}

# Gets a list of open pull requests
function getOpenPullRequests() {
  curl -s \
    https://api.github.com/repos/18f/cms-hitech-apd/pulls\?state\=open \
    | jq -rc ".[].number"
}

# Terminates a list of instances
#
# $1 - instance info
# $2 - list of open pull requests
function terminateIfClosedPR() {
  BITS=(${1//,/ })
  INSTANCE_ID=$(echo ${BITS[0]} | tr -d '"')
  INSTANCE_PR=$(echo ${BITS[1]} | sed "s/eapd-pr-//" | tr -d '"')

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
  COMMENTS=$(curl -s -u "$GH_BOT_USER:$GH_BOT_PASSWORD" https://api.github.com/repos/18f/cms-hitech-apd/issues/$1/comments | jq -c -r '.[] | {id:.id,user:.user.login}' | grep "$GH_BOT_USER" || true)
  if [ "$COMMENTS" ]; then
    ID=$(echo "$COMMENTS" | jq -c -r .id)
    curl -s -u "$GH_BOT_USER:$GH_BOT_PASSWORD" -d '{"body":"This deploy was cleaned up."}' -H "Content-Type: application/json" -X PATCH "https://api.github.com/repos/18f/cms-hitech-apd/issues/comments/$ID"
  fi
}

cleanupPreviewDeploys
