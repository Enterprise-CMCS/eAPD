data "aws_ami" "latest_mongo_image" {
    most_recent = true
    owners = ["582599238767"]
        filter {
            name = "name"
            values = ["eAPD Staging Mongo AMI*"]
        }
        filter {
            name   = "virtualization-type"
            values = ["hvm"]
        }
}

resource "aws_instance" "eapd_mongo" {
    ami                         = data.aws_ami.latest_mongo_image.id
    instance_type               = "m3.medium"
    vpc_security_group_ids      = ["sg-0bc99618daf4cd5da"]
    subnet_id                   = var.subnet_id
    key_name                    = "eapd_bbrooks"
    associate_public_ip_address = true # False in Staging & Prod
    disable_api_termination = false # True in Prod

    tags = {
        Name = var.instance_name
        Environment = "Preview"
        "Patch Group" = "RHEL7"
        "cms-cloud-exempt:open-sg" = "CLDSPT-5877"
        "Patch Window" = "ITOPS-Wave1-Non-Mktplc-Prod-MW"
        Terraform = "True"
    }

    connection {
        type = "ssh"
        user = var.ssh_user
        private_key = file(var.ssh_key)
        host = self.public_ip
    }

    provisioner "remote-exec" {
        inline = [
            "sudo sh -c 'echo license_key: ${var.newrelic_liscense_key} >> /etc/newrelic-infra.yml'",
        ]
    }
}
