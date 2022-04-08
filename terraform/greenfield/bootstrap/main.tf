#variable "aws_account_id" {}

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
  ignore_public_acls  = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_versioning" "terraform-state-bucket-versioning" {
  bucket = aws_s3_bucket.terraform-state-bucket.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_policy" "terraform-state-bucket-require-tls" {
  bucket = aws_s3_bucket.terraform-state-bucket.id
  policy = data.aws_iam_policy_document.bucket-require-tls.json
}

data "aws_iam_policy_document" "bucket-require-tls" {
  statement {
    sid    = "RequireTLS"
    effect = "Deny"

    principals {
      type        = "AWS"
      identifiers = [ var.aws_account_id]
    }

    actions = ["s3:*",]

    resources = [
      "${aws_s3_bucket.terraform-state-bucket.arn}/*",
      "${aws_s3_bucket.terraform-state-bucket.arn}",
    ]

    condition {
      test     = "Bool"
      variable = "aws:SecureTransport"
      values   = ["false"]
    }

    condition {
      test     = "NumericLessThan"
      variable = "s3:TlsVersion"
      values = ["1.2"]
    }
  }
}

#resource "aws_iam_policy" "terraform-state-bucket-require-tls" {
#  name = "terraform_state_bucket_require_tls_policy"
#  path = "/"
#  description = "IAM Policy for Terraform State Bucket Require TLS"
#  policy = <<POLICY
#{
#  "Version": "2012-10-17",
#  "Statement": [
#    {
#      "Principal": {
#        "AWS": "*"
#      },
#      "Action": [
#        "s3:*"
#      ],
#      "Resource": [
#        "arn:aws:s3:::aws_s3_bucket.terraform-state-bucket.id/*",
#        "arn:aws:s3:::aws_s3_bucket.terraform-state-bucket.id"
#      ],
#      "Effect": "Deny",
#      "Condition": {
#        "Bool": {
#          "aws:SecureTransport": "false"
#        },
#        "NumericLessThan": {
#          "s3:TlsVersion": "1.2"
#        }
#      }
#    }
#  ]
#}
#POLICY
#}
