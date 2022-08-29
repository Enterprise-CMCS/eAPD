resource "aws_s3_bucket" "eapd-cpm-bucket" {
    bucket = "eapd-cpm-bucket"

    tags = {
        Name = "eAPD CPM Bucket"
        Environment = "Prod" # Currently deployed into Test
        Terraform = "Prod" # Terraform method used to create
    }
}

resource "aws_s3_bucket_acl" "eapd-cpm-bucket-acl" {
    bucket = aws_s3_bucket.eapd-cpm-bucket.id
    acl    = "private"
}

resource "aws_s3_bucket_server_side_encryption_configuration" "eapd-cpm-bucket-sse"{
    bucket = aws_s3_bucket.eapd-cpm-bucket.id
    rule {
        apply_server_side_encryption_by_default {
        sse_algorithm = "AES256"
        }
    }
}

resource "aws_s3_bucket_public_access_block" "eapd-cpm-bucket-public-access-block" {
  bucket = aws_s3_bucket.eapd-cpm-bucket.id

  block_public_acls   = true
  block_public_policy = true
  ignore_public_acls  = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_versioning" "eapd-cpm-bucket-versioning" {
  bucket = aws_s3_bucket.eapd-cpm-bucket.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_policy" "eapd-cpm-bucket-require-tls" {
  bucket = aws_s3_bucket.eapd-cpm-bucket.id
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
      "${aws_s3_bucket.eapd-cpm-bucket.arn}/*",
      "${aws_s3_bucket.eapd-cpm-bucket.arn}",
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