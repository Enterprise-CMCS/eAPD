### Provide variables in non-Git tfvars file
terraform {
  backend "s3" {
    bucket         = "eapd-terraform-state"
    key            = "eapd_test_terraform.tfstate"
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

data "aws_vpc" "eapd-vpc-east-test" {
  id = var.vpc_id
}

resource "aws_security_group" "eapd-pr-sg-east-test" {
  name        = "eapd-pr-sg-east-test"
  description = "Allows web and SSH access for PR Instances"
  vpc_id      = data.aws_vpc.eapd-vpc-east-test.id

  ingress {
    description = "Secure Web Traffic from Internet"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "HI-C-dev-vpc-EnterpriseSgStack-178CJ9KJ940R8-EnterpriseAccessSg-1QRL3Z8BRGTZT"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["10.128.0.0/16", "10.129.0.0/16", "10.244.96.0/19", "10.223.120.0/22", "10.223.126.0/23"]
  }

  ingress {
    description = "VPN Servers Private East"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["10.232.32.0/19"]
  }

  ingress {
    description = "Cisco VPN Instance 2 Public East"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["34.196.35.156/32"]
  }

  ingress {
    description = "Cisco VPN Instance 1 Public East"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["52.20.26.200/32"]
  }

  ingress {
    description = "Cisco VPN Instance 3 Public East"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["52.5.212.71/32"]
  }

  ingress {
    description = "TF IP Address"
    from_port   = 0
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["68.134.21.72/32"]
  }

  ingress {
    description = "BB IP Address"
    from_port   = 0
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["73.173.73.13/32"]
  }  

  egress {
    description = "Egress to the world"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "eapd-pr-sg-east-test"
    Terraform = "Yes"
  }
}

module "mongo" {
    source = "./modules/databases"

    instance_name = var.instance_name
    newrelic_liscense_key = var.newrelic_liscense_key
    ssh_user = var.ssh_user
    ssh_key = var.ssh_key
    mongo_initdb_root_username = var.mongo_initdb_root_username
    mongo_initdb_root_password = var.mongo_initdb_root_password
    mongo_initdb_database = var.mongo_initdb_database
    mongo_database_username = var.mongo_database_username
    mongo_database_password = var.mongo_database_password
    mongo_database = var.mongo_database
    mongo_admin_url = var.mongo_admin_url
    database_url = var.database_url
    okta_domain = var.okta_domain
    okta_api_key = var.okta_api_key
    environment = var.environment

}
