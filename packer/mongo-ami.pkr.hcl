variable "vpc_id" {}
variable "subnet_id" {}
variable "gold_owner" {}
variable "mongo_database" {}
variable "mongo_initdb_root_username" {}
variable "mongo_initdb_root_password" {}
variable "mongo_initdb_database" {}
variable "mongo_database_username"{}
variable "mongo_database_password" {}
variable "mongo_admin_url" {}
variable "mongo_url" {}
variable "database_url" {}
variable "okta_domain" {}
variable "okta_api_key" {}
variable "environment" {}
variable "ami_name" {}

locals { timestamp = regex_replace(timestamp(), "[- TZ:]", "") }

source "amazon-ebs" "Golden_Image" {
    ami_name      = "eAPD ${var.environment} Mongo AMI - ${local.timestamp}"
    instance_type = "t3.medium"
    access_key    = ""
    secret_key    = ""
    region        = ""
    source_ami_filter {
        filters = {
            name                = "${var.ami_name}*"
            root-device-type    = "ebs"
            virtualization-type = "hvm"
        }
        most_recent = true
        owners      = [var.gold_owner]
    }
    ssh_username = "ec2-user"
    associate_public_ip_address = true
    vpc_id = var.vpc_id
    subnet_id = var.subnet_id

}

build {
    sources = ["source.amazon-ebs.Golden_Image"]

    provisioner "shell" {
        environment_vars = [
            "MONGO_DATABASE=${var.mongo_database}",
            "MONGO_INITDB_ROOT_USERNAME=${var.mongo_initdb_root_username}",
            "MONGO_INITDB_ROOT_PASSWORD=${var.mongo_initdb_root_password}",
            "MONGO_INITDB_DATABASE=${var.mongo_initdb_database}",
            "MONGO_DATABASE_USERNAME=${var.mongo_database_username}",
            "MONGO_DATABASE_PASSWORD=${var.mongo_database_password}",
            "MONGO_ADMIN_URL=${var.mongo_admin_url}",
            "MONGO_URL=${var.mongo_url}",
            "DATABASE_URL=${var.database_url}",
            "OKTA_DOMAIN=${var.okta_domain}",
            "OKTA_API_KEY=${var.okta_api_key}",
            "ENVIRONMENT=${var.environment}"
        ]
        script = "./mongo20220708.sh"
    }
}
