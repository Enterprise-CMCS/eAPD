terraform {
    backend "s3"{
        bucket = "terraform-state-bucket-name"
        key = "terraform.tfstate"
        region = "us-east-1"
    }
}

# Declare the provider
provider "aws" {
    region = var.aws_region
}

