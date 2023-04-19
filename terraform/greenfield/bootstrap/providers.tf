provider "aws" {
  region = "us-east-1"
}

terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
       version = "~> 4.0"
    }
  }

  required_version = ">= 0.14.6"

  backend "s3" {
    dynamodb_table = "terraform-state-lock"
    region         = "us-east-1"
    encrypt        = "true"
  }
}

