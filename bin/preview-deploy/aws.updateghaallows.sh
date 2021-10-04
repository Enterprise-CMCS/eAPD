aws ec2 modify-security-group-rules --group-id sg-08c28e8e20d748014 \
    --security-group-rules \
    SecurityGroupRuleId=sgr-0db6a4c28bc8906ed,SecurityGroupRule={IpProtocol=tcp,FromPort=22,ToPort=22,CidrIpv4=73.173.73.13/32,Description="Testing AWS CLI SG Update"}
