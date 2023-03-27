variable "vpc_id" {}
variable "subnet_id" {}
variable "gold_owner" {}
variable "preview_mongo_database" {}
variable "preview_mongo_initdb_root_username" {}
variable "preview_mongo_initdb_root_password" {}
variable "preview_mongo_initdb_database" {}
variable "preview_mongo_database_username" {}
variable "preview_mongo_database_password" {}
variable "preview_mongo_admin_url" {}
variable "preview_mongo_url" {}
variable "preview_database_url" {}
variable "preview_okta_domain" {}
variable "preview_okta_api_key" {}
variable "environment" {}
variable "preview_tealium_tag" {}
variable "preview_tealium_env" {}

locals { timestamp = regex_replace(timestamp(), "[- TZ:]", "") }

source "amazon-ebs" "Golden_Image" {
    ami_name      = "eAPD Multi-Test AMI - ${local.timestamp}"
    instance_type = "t3.2xlarge"
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
        inline = [
            "sudo cloud-init status --wait",
            "sudo echo 'ClientAliveInterval 2700' | sudo tee -a /etc/ssh/sshd_config",
            "sudo echo 'ClientAliveCountMax 0' | sudo tee -a /etc/ssh/sshd_config",
            "sudo sed -i'' 's/TCPKeepAlive yes/TCPKeepAlive no/' /etc/ssh/sshd_config",
            "sudo systemctl reload sshd"
        ]
    }    
    provisioner "shell" {
        environment_vars = [
            "MONGO_DATABASE=${var.preview_mongo_database}",
            "MONGO_INITDB_ROOT_USERNAME=${var.preview_mongo_initdb_root_username}",
            "MONGO_INITDB_ROOT_PASSWORD=${var.preview_mongo_initdb_root_password}",
            "MONGO_INITDB_DATABASE=${var.preview_mongo_initdb_database}",
            "MONGO_DATABASE_USERNAME=${var.preview_mongo_database_username}",
            "MONGO_DATABASE_PASSWORD=${var.preview_mongo_database_password}",
            "MONGO_ADMIN_URL=${var.preview_mongo_admin_url}",
            "MONGO_URL=${var.preview_mongo_url}",
            "DATABASE_URL=${var.preview_database_url}",
            "OKTA_DOMAIN=${var.preview_okta_domain}",
            "OKTA_API_KEY=${var.preview_okta_api_key}",
            "ENVIRONMENT=${var.environment}",
            "PREVIEW_TEALIUM_TAG=${var.preview_tealium_tag}",
            "PREVIEW_TEALIUM_ENV=${var.preview_tealium_env}"
        ]        
        script = "./preview-deps20230323.sh"
    }
    provisioner "shell" {
        environment_vars = [
            "MONGO_DATABASE=${var.preview_mongo_database}",
            "MONGO_INITDB_ROOT_USERNAME=${var.preview_mongo_initdb_root_username}",
            "MONGO_INITDB_ROOT_PASSWORD=${var.preview_mongo_initdb_root_password}",
            "MONGO_INITDB_DATABASE=${var.preview_mongo_initdb_database}",
            "MONGO_DATABASE_USERNAME=${var.preview_mongo_database_username}",
            "MONGO_DATABASE_PASSWORD=${var.preview_mongo_database_password}",
            "MONGO_ADMIN_URL=${var.preview_mongo_admin_url}",
            "MONGO_URL=${var.preview_mongo_url}",
            "DATABASE_URL=${var.preview_database_url}",
            "OKTA_DOMAIN=${var.preview_okta_domain}",
            "OKTA_API_KEY=${var.preview_okta_api_key}",
            "ENVIRONMENT=${var.environment}",
            "PREVIEW_TEALIUM_TAG=${var.preview_tealium_tag}",
            "PREVIEW_TEALIUM_ENV=${var.preview_tealium_env}"
        ]        
        script = "./preview-postgres20230323.sh"
    }
    provisioner "shell" {
        environment_vars = [
            "MONGO_DATABASE=${var.preview_mongo_database}",
            "MONGO_INITDB_ROOT_USERNAME=${var.preview_mongo_initdb_root_username}",
            "MONGO_INITDB_ROOT_PASSWORD=${var.preview_mongo_initdb_root_password}",
            "MONGO_INITDB_DATABASE=${var.preview_mongo_initdb_database}",
            "MONGO_DATABASE_USERNAME=${var.preview_mongo_database_username}",
            "MONGO_DATABASE_PASSWORD=${var.preview_mongo_database_password}",
            "MONGO_ADMIN_URL=${var.preview_mongo_admin_url}",
            "MONGO_URL=${var.preview_mongo_url}",
            "DATABASE_URL=${var.preview_database_url}",
            "OKTA_DOMAIN=${var.preview_okta_domain}",
            "OKTA_API_KEY=${var.preview_okta_api_key}",
            "ENVIRONMENT=${var.environment}",
            "PREVIEW_TEALIUM_TAG=${var.preview_tealium_tag}",
            "PREVIEW_TEALIUM_ENV=${var.preview_tealium_env}"
        ]        
        script = "./preview-mongo20230323.sh"
    }
    provisioner "shell" {
        environment_vars = [
            "MONGO_DATABASE=${var.preview_mongo_database}",
            "MONGO_INITDB_ROOT_USERNAME=${var.preview_mongo_initdb_root_username}",
            "MONGO_INITDB_ROOT_PASSWORD=${var.preview_mongo_initdb_root_password}",
            "MONGO_INITDB_DATABASE=${var.preview_mongo_initdb_database}",
            "MONGO_DATABASE_USERNAME=${var.preview_mongo_database_username}",
            "MONGO_DATABASE_PASSWORD=${var.preview_mongo_database_password}",
            "MONGO_ADMIN_URL=${var.preview_mongo_admin_url}",
            "MONGO_URL=${var.preview_mongo_url}",
            "DATABASE_URL=${var.preview_database_url}",
            "OKTA_DOMAIN=${var.preview_okta_domain}",
            "OKTA_API_KEY=${var.preview_okta_api_key}",
            "ENVIRONMENT=${var.environment}",
            "PREVIEW_TEALIUM_TAG=${var.preview_tealium_tag}",
            "PREVIEW_TEALIUM_ENV=${var.preview_tealium_env}"
        ]        
        script = "./preview-yum20230323.sh"
        timeout = "30m"
    }
    provisioner "shell" {
        environment_vars = [
            "MONGO_DATABASE=${var.preview_mongo_database}",
            "MONGO_INITDB_ROOT_USERNAME=${var.preview_mongo_initdb_root_username}",
            "MONGO_INITDB_ROOT_PASSWORD=${var.preview_mongo_initdb_root_password}",
            "MONGO_INITDB_DATABASE=${var.preview_mongo_initdb_database}",
            "MONGO_DATABASE_USERNAME=${var.preview_mongo_database_username}",
            "MONGO_DATABASE_PASSWORD=${var.preview_mongo_database_password}",
            "MONGO_ADMIN_URL=${var.preview_mongo_admin_url}",
            "MONGO_URL=${var.preview_mongo_url}",
            "DATABASE_URL=${var.preview_database_url}",
            "OKTA_DOMAIN=${var.preview_okta_domain}",
            "OKTA_API_KEY=${var.preview_okta_api_key}",
            "ENVIRONMENT=${var.environment}",
            "PREVIEW_TEALIUM_TAG=${var.preview_tealium_tag}",
            "PREVIEW_TEALIUM_ENV=${var.preview_tealium_env}"
        ]        
        script = "./preview-node20230323.sh"
    }
    provisioner "shell" {
        environment_vars = [
            "MONGO_DATABASE=${var.preview_mongo_database}",
            "MONGO_INITDB_ROOT_USERNAME=${var.preview_mongo_initdb_root_username}",
            "MONGO_INITDB_ROOT_PASSWORD=${var.preview_mongo_initdb_root_password}",
            "MONGO_INITDB_DATABASE=${var.preview_mongo_initdb_database}",
            "MONGO_DATABASE_USERNAME=${var.preview_mongo_database_username}",
            "MONGO_DATABASE_PASSWORD=${var.preview_mongo_database_password}",
            "MONGO_ADMIN_URL=${var.preview_mongo_admin_url}",
            "MONGO_URL=${var.preview_mongo_url}",
            "DATABASE_URL=${var.preview_database_url}",
            "OKTA_DOMAIN=${var.preview_okta_domain}",
            "OKTA_API_KEY=${var.preview_okta_api_key}",
            "ENVIRONMENT=${var.environment}",
            "PREVIEW_TEALIUM_TAG=${var.preview_tealium_tag}",
            "PREVIEW_TEALIUM_ENV=${var.preview_tealium_env}"
        ]        
        script = "./preview-cloudwatch20230323.sh"
    }    
    provisioner "file" {
        source = "nginx.conf.tpl"
        destination = "/home/ec2-user/nginx.conf.tpl"
    }
}