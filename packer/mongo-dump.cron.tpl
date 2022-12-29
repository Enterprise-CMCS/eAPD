# Cronjob to run MongoDump Hourly (For Testing)
# Hardcoding environment for testing
#bash /home/ec2-user/mongo-dump.sh $(date +%Y%m%d%H%M%S) $ENVIRONMENT $MONGO_URL
bash /home/ec2-user/mongo-dump.sh $(date +%Y%m%d%H%M%S) staging $MONGO_URL
