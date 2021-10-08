variable "eapd_mongo_instance_type" {}
variable "eapd_mongo_vpc_security_group_ids" {}
variable "eapd_mongo_subnet_id" {}

data "aws_ami" "latest_golden_image" {
    most_recent = true
    owners = ["842420567215"]
        filter {
            name = "name"
            values = ["EAST-RH 7-9 Gold Image V.*"]
        }
        filter {
            name   = "virtualization-type"
            values = ["hvm"]
        }
}

resource "aws_instance" "eapd_mongo_staging" {

    ami                         = data.aws_ami.latest_golden_image.id
    instance_type               = var.eapd_mongo_instance_type
    vpc_security_group_ids      = var.eapd_mongo_vpc_security_group_ids
    subnet_id                   = var.eapd_mongo_subnet_id
    tags = {
        Name = "eAPD Staging MongoDB"
    }
}

