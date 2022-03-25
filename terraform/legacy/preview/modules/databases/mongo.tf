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
    subnet_id                   = "subnet-09af713f4e068ac99"
    key_name                    = "eapd_bbrooks"
#    user_data                   = "../../../bin/prod-deploy/aws.user-data.sh"
    associate_public_ip_address = true #This is a preview resource, should be moved to preview Terraform
    tags = {
        Name = var.instance_name
        Environment = "Public"
        "Patch Group" = "RHEL7"
        "cms-cloud-exempt:open-sg" = "CLDSPT-5877"
        "Patch Window" = "ITOPS-Wave1-Non-Mktplc-Prod-MW"
        Terraform = "True"
    }
    disable_api_termination = false # True in Prod

    vars = {
    MONGO_DATABASE = var.preview_mongo_database
    MONGO_INITDB_ROOT_USERNAME = var.preview_mongo_initdb_root_username
    MONGO_INITDB_ROOT_PASSWORD = var.preview_mongo_initdb_root_password
    MONGO_INITDB_DATABASE = var.preview_mongo_initdb_database
    MONGO_DATABASE_USERNAME = var.preview_mongo_database_username
    MONGO_DATABASE_PASSWORD = var.preview_mongo_database_password
    MONGO_ADMIN_URL = var.preview_mongo_admin_url
    DATABASE_URL = var.preview_database_url
    OKTA_DOMAIN = var.preview_okta_domain
    OKTA_API_KEY = var.preview_okta_api_key
    ENVIRONMENT = var.preview_environment
    }
    user_data                   = "${file("../../../packer/mongo.sh")}"

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
