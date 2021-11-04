### FUTURE USE ###
### Will function like main.tf for Staging ###
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

module "eAPD" {
    source = "./modules"
}