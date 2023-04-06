terraform {
  backend "s3" {
    bucket         = "eapd-terraform-state"
    key            = "eapd_public_terraform.tfstate"
    region         = "us-east-1"
    ### Potential future use, allows for resource locking to prevent collisions from multiple users 
    # Replace this with your DynamoDB table name!
    #dynamodb_table = "terraform-up-and-running-locks"
    #encrypt        = true
  }
  required_version = "~> 1.3"
}

provider "aws" {
    region = "us-east-1"
    profile = ""
}

data "aws_ami" "latest_golden_image" {
    most_recent = true
    owners = ["842420567215"]
        filter {
            name = "name"
            values = ["EAST-RH 7-9 Gold Image V.*"]
        }
        filter {
            name   = "virtualization-type"
            values = ["hvm"]
        }
}

module "instances" {
    source = "./modules/instances"

    eapd_jumpbox_ami                          = data.aws_ami.latest_golden_image
    eapd_jumpbox_key_name_bb                  = var.eapd_jumpbox_key_name_bb
    eapd_jumpbox_key_name_tf                  = var.eapd_jumpbox_key_name_tf
    eapd_jumpbox_key_name_tb                  = var.eapd_jumpbox_key_name_tb
    eapd_jumpbox_vpc_security_group_ids       = var.eapd_jumpbox_vpc_security_group_ids
    eapd_jumpbox_subnet_id                    = var.eapd_jumpbox_subnet_id
    newrelic_liscense_key                     = var.newrelic_liscense_key
}

