### FUTURE USE ###
### Will function like main.tf for Staging ###
variable "eapd_mongo_instance_type" {}
variable "eapd_mongo_vpc_security_group_ids" {}
variable "eapd_mongo_subnet_id" {}

terraform {
  backend "s3" {
    bucket         = "eapd-terraform-state"
    key            = "eapd_staging_terraform.tfstate"
    region         = "us-east-1"
    ### Potential future use, allows for resource locking to prevent collisions from multiple users 
    # Replace this with your DynamoDB table name!
    #dynamodb_table = "terraform-up-and-running-locks"
    #encrypt        = true
  }
}

provider "aws" {
    region = "us-east-1"
    profile = ""
    access_key = ""
    secret_key = ""
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

    eapd_mongo_instance_type                = var.eapd_mongo_instance_type
    eapd_mongo_vpc_security_group_ids       = var.eapd_mongo_vpc_security_group_ids
    eapd_mongo_subnet_id                    = var.eapd_mongo_subnet_id
}