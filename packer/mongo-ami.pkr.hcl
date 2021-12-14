variable "vpc_id" {}
variable "subnet_id" {}
variable "ami_name" {}
variable "gold_owner" {}
variable "staging_mongo_database" {}
variable "staging_mongo_initdb_root_username" {}
variable "staging_mongo_initdb_root_password" {}
variable "staging_mongo_initdb_database" {}
variable "staging_mongo_database_username"{}
variable "staging_mongo_database_password" {}
variable "staging_mongo_admin_url" {}
variable "staging_database_url" {}
variable "staging_okta_domain" {}
variable "staging_okta_api_key" {}

locals { timestamp = regex_replace(timestamp(), "[- TZ:]", "") }

source "amazon-ebs" "Golden_Image" {
    ami_name      = "eAPD Staging Mongo AMI - ${local.timestamp}"
    instance_type = "t3.small"
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
        owners      = [var.gold_owner]
    }
    ssh_username = "ec2-user"
    associate_public_ip_address = true
    vpc_id = var.vpc_id
    subnet_id = var.subnet_id
#    security_group_id = var.security_group_id
}

build {
    sources = ["source.amazon-ebs.Golden_Image"]



    provisioner "shell" {
        environment_vars = [
            "MONGO_DATABASE=${var.staging_mongo_database}",
            "MONGO_INITDB_ROOT_USERNAME=${var.staging_mongo_initdb_root_username}",
            "MONGO_INITDB_ROOT_PASSWORD=${var.staging_mongo_initdb_root_password}",
            "MONGO_INITDB_DATABASE=${var.staging_mongo_initdb_database}",
            "MONGO_DATABASE_USERNAME=${var.staging_mongo_database_username}",
            "MONGO_DATABASE_PASSWORD=${var.staging_mongo_database_password}",
            "MONGO_URL=${var.staging_mongo_admin_url}",
            "DATABASE_URL=${var.staging_database_url}",
            "OKTA_DOMAIN=${var.staging_okta_domain}",
            "OKTA_API_KEY=${var.staging_okta_api_key}"
        ]
        script = "./mongo.sh"
    }
}
