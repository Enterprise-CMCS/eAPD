provider "aws" {
    access_key = ""
    secret_key = ""
    region     = "us-east-1"
}

resource "aws_s3_bucket" "terraform-state-bucket" {
    bucket = "terraform-state-bucket-${formatdate("YYYYMMDDhhmmss", "2022-02-11T14:45:30-05:00")}"

    tags = {
        Name = "Terraform State Bucket"
        Environment = "Test" # Currently deployed into Test
        Terraform = "Bootstrap" # Terraform method used to create
    }
}

resource "aws_s3_bucket_acl" "terraform-state-bucket-acl" {
    bucket = aws_s3_bucket.terraform-state-bucket.id
    acl    = "private"
}

resource "aws_s3_bucket_server_side_encryption_configuration" "terraform-state-bucket-sse"{
    bucket = aws_s3_bucket.terraform-state-bucket.id
    rule {
        apply_server_side_encryption_by_default {
        sse_algorithm = "AES256"
        }
    }
}

resource "aws_s3_bucket_public_access_block" "terraform-state-bucket-public-access-block" {
  bucket = aws_s3_bucket.terraform-state-bucket.id

  block_public_acls   = true
  block_public_policy = true
}

resource "aws_s3_bucket_versioning" "terraform-state-bucket-versioning" {
  bucket = aws_s3_bucket.terraform-state-bucket.id
  versioning_configuration {
    status = "Enabled"
  }
}
