locals {
  name_prefix = "${var.project}-${var.environment}"
}

# Github OIDC
module "actions-aws-oidc-provider" {
  source = "./modules/oidc/github"

  subject_claim_filters                      = var.subject_claim_filters
  audience_list                              = var.audience_list
  thumbprint_list                            = var.thumbprint_list
  github_actions_roles                       = var.github_actions_roles
}

# S3 Bucket Creation



# ECR Repositories

resource "aws_ecr_repository" "web-ecr" {
  name         = "${var.project}-${var.environment}-web"
  image_scanning_configuration {
    scan_on_push = true
  }

  tags = {
    Project = var.project
    Team    = var.team
    Environment = var.environment
  }
}

resource "aws_ecr_repository" "api-ecr" {
  name         = "${var.project}-${var.environment}-api"
  image_scanning_configuration {
    scan_on_push = true
  }

  tags = {
    Project = var.project
    Team    = var.team
    Environment = var.environment
  }
}

#RDS

data "aws_caller_identity" "current" {}

module "aws-parameter-group" {
  source         = "./modules/db_parameter_group" 
  name           = var.parameter_group_name
  family         = var.family
}

module "aws-subnet-group" {
  source         = "./modules/db_subnet_group" 
  name           = var.subnet_group_name
  subnet_ids     = var.subnet_ids
}


module "aws-rds" {
  source                 = "./modules/rds"
  identifier             = var.identifier

  engine                 = var.engine
  engine_version         = var.engine_version
  instance_class         = var.instance_class
  allocated_storage      = var.allocated_storage
  license_model          = var.license_model

 
  username               = var.username
  password               = var.password
  port                   = var.port
  
  final_snapshot_identifier = var.final_snapshot_identifier
  skip_final_snapshot       = var.skip_final_snapshot
  recovery_window_in_days   = var.recovery_window_in_days
  additional_security_groups      = var.additional_security_groups
  db_subnet_group_name            = module.aws-subnet-group.db_subnet_group_name
  parameter_group_name            = module.aws-parameter-group.db_parameter_group_name
  enabled_cloudwatch_logs_exports = var.enabled_cloudwatch_logs_exports
  backup_retention_period         = var.backup_retention_period
  backup_window                   = var.backup_window
  
  vpc_id                      = var.vpc_id
  security_group_tags         = var.rds_security_group_tags
  ingresses                   = var.rds_ingresses
  egresses                    = var.rds_egresses
  security_group_name         = var.rds_security_group_name
  security_group_description  = var.rds_security_group_description
} 

# EC2
module "aws-ec2" {
  source                         = "./modules/ec2"
  instance_type                  = var.instance_type
  subnet_id                      = var.subnet_id
  additional_security_groups     = var.additional_security_groups
  key_name                       = var.key_name
  monitoring                     = var.monitoring
  root_block_device             = var.root_block_device
  ebs_block_device              = var.ebs_block_device
  tags                           = var.tags
  volume_tags                    = var.volume_tags

  vpc_id                      = var.vpc_id
  security_group_tags         = var.security_group_tags
  ingresses                   = var.ingresses
  egresses                    = var.egresses
  security_group_name         = var.security_group_name
  security_group_description  = var.security_group_description


}

#iam policy
resource "aws_iam_policy" "task_secrets" {
  name_prefix = "${local.name_prefix}-task-secrets-policy"
  path = "/delegatedadmin/developer/"
  policy      = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ssm:GetParameters",
        "kms:Decrypt"
      ],
      "Resource": ["*"]
    }
  ]
}
EOF
  
}





# MongoDB

