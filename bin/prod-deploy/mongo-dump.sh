#!/bin/sh
# S3 bucket name
BUCKET=eapd-mongo-dump-$ENVIRONMENT/
# Linux user account
USER=ubuntu
# Backup directory
DEST=/home/$USER/backups/dump
# Dump z2p & poststodos
mongodump — db z2p — out $DEST
# File name
TIME=`/bin/date — date=’+5 hour 30 minutes’ ‘+%d-%m-%Y-%I-%M-%S-%p’`
# Tar file of backup directory
TAR=$DEST/../$TIME.tar
# Create tar of backup directory
/bin/tar cvf $TAR -C $DEST .
# Upload tar to s3
/usr/bin/aws s3 cp $TAR s3://$BUCKET
# Remove tar file locally
/bin/rm -f $TAR
# Remove backup directory
/bin/rm -rf $DEST
# All done
echo “Backup available at https://s3.amazonaws.com/$BUCKET/$TIME.tar"