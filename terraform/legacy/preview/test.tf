### Provide variables in non-Git tfvars file
variable "vpc_id" {}

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
    description = "SSH Access from Internet"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
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


