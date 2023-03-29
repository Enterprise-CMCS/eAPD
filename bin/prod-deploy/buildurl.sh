curl -vvv -H "Circle-Token: ${CIRCLE_TOKEN}" -L https://circleci.com/api/v1.1/project/gh/Enterprise-CMCS/eAPD/${CIRCLE_BUILD_NUM}/artifacts |grep -o 'https://[^"]*' |grep backend.zip > build-url.txt
