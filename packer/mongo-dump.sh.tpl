## Var 1 is timestamp, 2 is environment, 3 is Mongo URL
## Create var for time so value doesn't drift between creating tarball and aws cp to S3
## Timestamp command $(date +%Y%m%d%H%M%S)
##Create dump
mongodump --uri=$3
##Tar zip dump
tar -cvf $(echo $2)_mongo_(echo $1).tar.gz dump/
##Send it
aws s3 cp $2_mongo_$1.tar.gz s3://eapd-mongo-dump-$2