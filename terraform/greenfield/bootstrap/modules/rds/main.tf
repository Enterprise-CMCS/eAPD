#Generate a random password
resource "random_password" "db_password" {
  length           = 16
  special          = true
  override_special = "!#$%&*()-_=+[]{}<>:?"
}

#Push the random password to Aws Secret Manager
resource "aws_secretsmanager_secret" "db_credential_secret" {
  name                    = var.aws_secretsmanager_secret_name
  recovery_window_in_days = var.recovery_window_in_days
}

resource "aws_secretsmanager_secret_version" "db_password" {
  secret_id      = aws_secretsmanager_secret.db_credential_secret.id
  secret_string  = random_password.db_password.result
  
}

module "rds-sgs" {
    source                      = "../security-groups"
    vpc_id                      = var.vpc_id
    tags                        = var.security_group_tags
    ingresses                   = var.ingresses
    egresses                    = var.egresses
    security_group_name         = var.security_group_name
    security_group_description  = var.security_group_description   
}

resource "aws_db_instance" "pg-db" {

  identifier             = var.identifier

  engine                 = var.engine
  engine_version         = var.engine_version
  instance_class         = var.instance_class
  allocated_storage      = var.allocated_storage
  license_model          = var.license_model

  
  username               = var.username
  password               = random_password.db_password.result
  port                   = var.port

  
  availability_zone      = var.availability_zone
  multi_az               = var.multi_az
  vpc_security_group_ids = concat([ module.rds-sgs.security_group_id], var.additional_security_groups)
  db_subnet_group_name   = var.db_subnet_group_name
  parameter_group_name   = var.parameter_group_name
  publicly_accessible    = var.publicly_accessible
  

  skip_final_snapshot       = var.skip_final_snapshot
  final_snapshot_identifier = var.final_snapshot_identifier
  deletion_protection       = var.deletion_protection
  enabled_cloudwatch_logs_exports  = var.enabled_cloudwatch_logs_exports
  backup_retention_period   = var.backup_retention_period
  backup_window             = var.backup_window
  storage_encrypted         = true

  tags                      = var.tags

}

# Cloudwatch Log group
resource "aws_cloudwatch_log_group" "db-log-group" {
  for_each = toset([for log in var.enabled_cloudwatch_logs_exports : log if var.create_cloudwatch_log_group ])

  name              = "/aws/rds/instance/${var.identifier}/${each.value}"
  retention_in_days = var.cloudwatch_log_group_retention_in_days
  kms_key_id        = var.cloudwatch_log_group_kms_key_id

  tags = var.tags
}