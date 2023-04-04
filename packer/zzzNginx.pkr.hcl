variable "vpc_id" {}
variable "subnet_id" {}
variable "gold_owner" {}

locals { timestamp = regex_replace(timestamp(), "[- TZ:]", "") }

source "amazon-ebs" "Golden_Image" {
    ami_name      = "eAPD Nginx-Test AMI - ${local.timestamp}"
    instance_type = "t3.medium"
    access_key    = ""
    secret_key    = ""
    region        = ""
    source_ami_filter {
        filters = {
            name                = "eAPD Single-Test AMI -*"
            root-device-type    = "ebs"
            virtualization-type = "hvm"
        }
        most_recent = true
        owners      = ["582599238767"]
    }
    ssh_username = "ec2-user"
    ena_support = true
    associate_public_ip_address = true
    vpc_id = var.vpc_id
    subnet_id = var.subnet_id
}

build {
    sources = ["source.amazon-ebs.Golden_Image"]

    provisioner "shell" {
        script = "./zzzNginxTest.sh"
    }
}