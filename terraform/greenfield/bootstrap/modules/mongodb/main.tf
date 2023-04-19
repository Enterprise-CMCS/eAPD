resource "random_password" "db_password" {
  length           = 16
  special          = true
  override_special = "!#$%&*()-_=+[]{}<>:?"
}

resource "aws_secretsmanager_secret" "db_password" {
  name = var.aws_secretsmanager_secret_name
  recovery_window_in_days = var.recovery_window_in_days
}

resource "aws_secretsmanager_secret_version" "db_password" {
  secret_id     = aws_secretsmanager_secret.db_password.id
  secret_string = random_password.db_password.result
  
}

data "aws_ami" "latest_mongo_image" {
    most_recent = true
    owners = [var.owners]
        filter {
            name = "name"
            values = [var.ami_filter_values]
        }
        filter {
            name   = "virtualization-type"
            values = ["hvm"]
        }
}

resource "aws_instance" "mongo_db" {
    ami                         = data.aws_ami.latest_mongo_image.id
    instance_type               = var.instance_type
    vpc_security_group_ids      = var.vpc_security_group_ids
    key_name                    = var.key_name
    iam_instance_profile        = var.iam_instance_profile
    hibernation                 = final_snapshot_identifier
    depends_on                  = [aws_security_group.eapd-production-mongo-ec2]  
    tags                        = var.tags                                        
    user_data = <<-EOL
      #!/bin/bash -xe
      sudo sh -c "echo license_key: ${var.newrelic_liscense_key} >> /etc/newrelic-infra.yml"
    EOL   
}
