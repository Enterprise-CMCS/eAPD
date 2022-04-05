curl -H "${CIRCLE_TOKEN}" -L https://circleci.com/api/v2/project/gh/CMSgov/eAPD/${CIRCLE_BUILD_NUM}/artifacts |grep -o 'https://[^"]*' |grep backend.zip > build-url.txt
