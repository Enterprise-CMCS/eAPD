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
    server_side_encryption_configuration {
        rule {
            apply_server_side_encryption_by_default {
                sse_algorithm = "AES256"
            }
        }
    }
}
