data "aws_ami" "latest_mongo_image" {
    most_recent = true
    owners = ["582599238767"]
        filter {
            name = "name"
            values = ["eAPD Staging Mongo AMI*"]
        }
        filter {
            name   = "virtualization-type"
            values = ["hvm"]
        }
}

resource "aws_instance" "eapd_mongo" {
    ami                         = data.aws_ami.latest_mongo_image.id
    instance_type               = "m3.medium"
    vpc_security_group_ids      = ["sg-084cef5d95e485fd4", "sg-0f3c6bfa62fcefa4a", "sg-02271e574628f901f"]
    subnet_id                   = "subnet-09af713f4e068ac99"
    key_name                    = "eapd_bbrooks"
    user_data                   = "../../../bin/prod-deploy/aws.user-data.sh"
    associate_public_ip_address = true #This is a preview resource, should be moved to preview Terraform
    tags = {
        Name = var.instance_name
        Environment = "Public"
        "Patch Group" = "RHEL7"
        "cms-cloud-exempt:open-sg" = "CLDSPT-5877"
        "Patch Window" = "ITOPS-Wave1-Non-Mktplc-Prod-MW"
        Terraform = "True"
    }
#    depends_on = [aws_security_group.eapd-staging-mongo-ec2]
    disable_api_termination = false # True in Prod
#    user_data = <<-EOL
#    #!/bin/bash -xe
#    sudo sh -c "echo license_key: '$var.new_relic_liscense_key' >> /etc/newrelic-infra.yml"
#    EOL
}
