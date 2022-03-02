#Create the S3 bucket
resource "aws_s3_bucket" "bucket-test-bucket" {
    bucket = "bucket-${lower("${terraform.workspace}")}-${formatdate("YYYYMMDDhhmmss", "2022-02-11T14:45:30-05:00")}"
#    acl    = "private"
#    server_side_encryption_configuration {
#        rule {
#            apply_server_side_encryption_by_default {
#                sse_algorithm = "AES256"
#            }
#        }
#    }
    tags = {
        Name = "Terraform State Bucket"
        Environment = "Test" # Currently deployed into Test
        Terraform = "Test Workspace" # Terraform method used to create
    }
}
