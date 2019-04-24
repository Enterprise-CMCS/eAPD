# Posts a comment with the preview deploy URL to the Github pull request, or
# updates the comment if one already exists.
#
# $1 - pull request number
# $2 - preview deploy URL
# $3 - SHA of the git commit that was deployed
#
# Expects global environment variables:
#   GH_BOT_USER - The username of the Github user to post as
#   GH_BOT_PASSWORD - The password for the Github user
function postOrUpdateComment() {
  local PRNUM=$1
  local PREVIEW_URL=$2
  local GIT_SHA=$3

  # Update the comment on Github, if there's one already.  This way we'll know the bot updated the thing.
  COMMENTS=$(curl -s -u "$GH_BOT_USER:$GH_BOT_PASSWORD" https://api.github.com/repos/18f/cms-hitech-apd/issues/$PRNUM/comments | jq -c -r '.[] | {id:.id,user:.user.login}' | grep "$GH_BOT_USER" || true)
  if [ "$COMMENTS" ]; then
    ID=$(echo "$COMMENTS" | jq -c -r .id)
    # Use $ before the body to use ANSI encoding, which preserves the newlines.
    # Add the commit SHA so we know it deployed and when.
    curl -s -u "$GH_BOT_USER:$GH_BOT_PASSWORD" -d $'{"body":"See this pull request in action: '"$PREVIEW_URL"'\n\n'"$GIT_SHA"'"}' -H "Content-Type: application/json" -X PATCH "https://api.github.com/repos/18f/cms-hitech-apd/issues/comments/$ID"
  else
    # Post a new message if one doesn't already exist.
    curl -s -u "$GH_BOT_USER:$GH_BOT_PASSWORD" -d '{"body":"See this pull request in action: '"$PREVIEW_URL"'"}' -H "Content-Type: application/json" -X POST "https://api.github.com/repos/18f/cms-hitech-apd/issues/$PRNUM/comments"
  fi
}

# $1 - pull request number
# $2 - preview deploy URL
# $3 - SHA of the git commit that was deployed
postOrUpdateComment $1 $2 $3