# Declare the provider
provider "aws" {
    region = var.aws_region
    profile = "eAPD-${terraform.workspace}"
}

# Terraform Version is controlled by .terraform-version and is set to 1.0.11 (02/02/2022)
#terraform {
#    backend "s3"{
#        profile = "eAPD-Test" # Will update to Prod when it comes online
#        bucket = "eapd-terraform-state"
#        key = "terraform.tfstate"
#        region = "us-east-1"
#    }
#}
