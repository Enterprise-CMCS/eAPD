
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
}

provider "aws" {
    region = "us-east-1"
    profile = ""
    access_key = ""
    secret_key = ""
}

module "eAPD" {
    source = "./modules"
    instance_name = var.instance_name
    newrelic_liscense_key = var.newrelic_liscense_key
    ssh_user = var.ssh_user
    ssh_key = var.ssh_key
}