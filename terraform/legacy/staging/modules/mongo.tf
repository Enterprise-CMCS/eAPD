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
    vpc_security_group_ids      = ["sg-01e01435dbbe6ce32", aws_security_group.eapd-staging-mongo-ec2.id]
    subnet_id                   = "subnet-07e1b9ed6ed5fb8c7"
    root_block_device {
      encrypted = true
    }
    metadata_options {
      http_tokens = "required"
    }    
    key_name                    = "eapd_bbrooks"

    tags = {
        Name = var.instance_name
        Environment = "staging"
        "Patch Group" = "RHEL7"
        "cms-cloud-exempt:open-sg" = "CLDSPT-5877"
        "Patch Window" = "ITOPS-Wave1-Non-Mktplc-Prod-MW"
        Terraform = "True"
    }
    depends_on = [aws_security_group.eapd-staging-mongo-ec2]
    user_data = <<-EOL
    #!/bin/bash -xe
    sudo sh -c "echo license_key: ${var.newrelic_liscense_key} >> /etc/newrelic-infra.yml"
    EOL    
}
