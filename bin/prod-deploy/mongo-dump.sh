 #Create var for time so value doesn't drift between creating tarball and aws cp to S3
 TIMESTAMP=$(date +%Y%m%d%H%M%S)
 #Create dump
 #mongodump --uri=\"$"$ENVIRONMENT"_MONGO_URL\"
 mongodump --uri=$STAGING_MONGO_URL
 #Tar zip dump
 tar -cvf "$ENVIRONMENT"_mongo_"$("$TIMESTAMP")".tar.gz dump/
 #Send it
 aws s3 cp "$ENVIRONMENT"_mongo_"$TIMESTAMP".tar.gz s3://eapd-mongo-dump-"$ENVIRONMENT"
 echo $TIMESTAMP