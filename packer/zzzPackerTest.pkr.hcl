variable "vpc_id" {}
variable "subnet_id" {}
variable "gold_owner" {}

locals { timestamp = regex_replace(timestamp(), "[- TZ:]", "") }

source "amazon-ebs" "Golden_Image" {
    ami_name      = "eAPD Single-Test AMI - ${local.timestamp}"
    instance_type = "t3.medium"
    access_key    = ""
    secret_key    = ""
    region        = ""
    source_ami_filter {
        filters = {
            name                = "EAST-RH 7-9 Gold Image V.*"
            root-device-type    = "ebs"
            virtualization-type = "hvm"
        }
        most_recent = true
        owners      = ["842420567215"]
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
        script = "./zzzPackerTest.sh"
    }
    provisioner "file" {
        source = "nginx.conf.tpl"
        destination = "/home/ec2-user/nginx.conf20230331.tpl"
    }
}