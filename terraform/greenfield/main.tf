#Create the S3 bucket
resource "aws_s3_bucket" "terraform-state" {
    bucket = "${lookup(var.project_name, var.env)}-${formatdate("YYYY-MM-DD-hh")}"
    acl= "private"

    # Example uses force_destroy = true, want to evaluate
    force_destroy = false

    tags = {
        Name = "${lookup(var.project_name, var.env)}"
        Terraform = "True"
        Description = "Terraform state bucket"
    }
}