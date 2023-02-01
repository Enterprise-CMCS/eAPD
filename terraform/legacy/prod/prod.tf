
### FUTURE USE ###
### Will function like main.tf for Prod ###
terraform {
  backend "s3" {
    bucket         = "eapd-terraform-state"
    key            = "eapd_prod_terraform.tfstate"
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

module "eAPD" {
    source = "./modules"
    instance_name = var.instance_name
    newrelic_liscense_key = var.newrelic_liscense_key
    aws_account_id = var.aws_account_id
    root_block_device {
      encrypted = true
    }
    metadata_options {
      http_tokens = "required"
    }
    disable_api_termination = true
}
