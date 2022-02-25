# Declare the provider
provider "aws" {
    region = "us-east-1"
    profile = "eAPD-${terraform.workspace}"
}

# Terraform Version is controlled by .terraform-version and is set to 1.0.11 (02/02/2022)
terraform {
    backend "s3"{
        profile = "eAPD-Test" # Will update to Prod when it comes online
        bucket = "terraform-state-bucket-20220211144530"
        key = "terraform.tfstate"
        region = "us-east-1"
    }
}
