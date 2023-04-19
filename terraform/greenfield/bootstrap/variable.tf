variable "subject_claim_filters" {
  description = "A list of valid subject claim filters" 
  type        = list(string)
}

# General
variable "region" { 
  default     = "us-east-1" 
  description = "AWS region"
}

variable "environment" { 
  description = "Environment name"
}

variable "project" { 
  default     = "eapd" 
  description = "Project name" 
}

variable "team" { 
  default     = "eapd" 
  description = "Team name"
}

# Github OIDC
variable "audience_list" {
  description = "A list of allowed audiences (AKA client IDs) for the AWS identity provider"
  type        = list(string)
  default     = ["sts.amazonaws.com"] # the default audience for the GitHub OIDC provider, see https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services#adding-the-identity-provider-to-aws
}

variable "thumbprint_list" {
  description = " A list of thumbprints for the OIDC identity provider's server certificate"
  type        = list(string)
  default     = ["6938fd4d98bab03faadb97b34396831e3780aea1"] # see https://github.blog/changelog/2022-01-13-github-actions-update-on-oidc-based-deployments-to-aws/ and https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_create_oidc_verify-thumbprint.html
}

variable github_actions_roles {
  description = "list of roles"
  type        = list(object({

    role_name: string
    description: string
    policy_name: string
    role_permissions_policy_json_path: string
  
  }))
  default = []
}

#RDS

variable "tags" {
  description = "tags to add "
  type        = map(any)
  default     = {}
}

variable "identifier" {
  description = "The name of the RDS instance"
  type = string
}

variable "vpc_security_group_ids" {
  description = "List of security group ids to attach to the DB"
  type = list(string)
  default = []
}

variable "allocated_storage" {
  description = "The allocated storage in gigabytes"
  type        = string
  default     = null
}


variable "license_model" {
  description = "License model information for this DB instance. Optional, but required for some DB s, i.e. Oracle SE1"
  type        = string
  default     = null
}


variable "engine" {
  description = "The database engine to use"
  type        = string
  default     = null
}

variable "engine_version" {
  description = "The engine version to use"
  type        = string
  default     = null
}

variable "instance_class" {
  description = "The instance type of the RDS instance"
  type        = string
  default     = null
}

variable "db_name" {
  description = "The DB name to create. If omitted, no database is created initially"
  type        = string
  default     = null
}

variable "username" {
  description = "Username for the master DB user"
  type        = string
  default     = null
}

variable "password" {
  description = "Password for the master DB user. Note that this may show up in logs, and it will be stored in the state file"
  type        = string
  default     = null
}

variable "port" {
  description = "The port on which the DB accepts connections"
  type        = string
  default     = null
}


variable "skip_final_snapshot" {
  description = "Determines whether a final DB snapshot is created before the DB instance is deleted. If true is specified, no DBSnapshot is created. If false is specified, a DB snapshot is created before the DB instance is deleted"
  type        = bool
  default     = true
}

variable "final_snapshot_identifier" {
  description = "The name  to the final snapshot on db destroy"
  type        = string
  default     = ""
}

variable "db_subnet_group_name" {
  description = "Name of DB subnet group. DB instance will be created in the VPC associated with the DB subnet group. If unspecified, will be created in the default VPC"
  type        = string
  default     = null
}

variable "parameter_group_name" {
  description = "Name of the DB parameter group to associate"
  type        = string
  default     = null
}

variable "deletion_protection" {
  description = "The database can't be deleted when this value is set to true."
  type        = bool
  default     = false
}


variable "prevent_destroy" {
  description = "prevent terraform destroying db if value is set to true."
  type        = bool
  default     = true
}


variable "publicly_accessible" {
  description = "Bool to control if instance is publicly accessible"
  type        = bool
  default     = false
}

variable "availability_zone" {
  description = "The Availability Zone of the RDS instance"
  type        = string
  default     = null
}

variable "multi_az" {
  description = "Specifies if the RDS instance is multi-AZ"
  type        = bool
  default     = false
}

variable "aws_secretsmanager_secret_name" {
  description = "Name of aws secretsmanager secret"
  type        = string
  default     = null
}

variable "recovery_window_in_days" {
  description = "recovery window in days"
  type        = number
  default     = 0
}

variable "create_cloudwatch_log_group" {
  description = "Determines whether a CloudWatch log group is created for each `enabled_cloudwatch_logs_exports`"
  type        = bool
  default     = true
}

variable "cloudwatch_log_group_retention_in_days" {
  description = "The number of days to retain CloudWatch logs for the DB instance"
  type        = number
  default     = 7
}

variable "cloudwatch_log_group_kms_key_id" {
  description = "The ARN of the KMS Key to use when encrypting log data"
  type        = string
  default     = null
}

variable "enabled_cloudwatch_logs_exports" {
  description = "List of log types to enable for exporting to CloudWatch logs. If omitted, no logs will be exported. Valid values (depending on engine): alert, audit, error, general, listener, slowquery, trace, postgresql (PostgreSQL), upgrade (PostgreSQL)."
  type        = list(string)
  default     = []
}

variable "subnet_ids" {
  description = "A list of VPC subnet IDs"
  type        = list(string)
  default     = []
}

variable "subnet_group_name" {
  description = "The name of the DB subnet group"
  type        = string
  default     = ""
}

variable "family" {
  description = "The family of the DB parameter group"
  type        = string
  default     = null
}

variable "parameters" {
  description = "A list of DB parameter maps to apply"
  type        = list(map(string))
  default     = []
}

variable "backup_retention_period" {
  description = "The days to retain backups for"
  type        = number
  default     = 7
}

variable "backup_window" {
  description = "The daily time range (in UTC) during which automated backups are created if they are enabled."
  type        = string
  default     = "03:00-06:00"
}

# rds Security group
variable "rds_security_group_name" {
  description = "security group name"
  type        = string
  default     = ""
}

variable "rds_security_group_description" {
  description = "security group description"
  type        = string
  default     = ""
}

variable "rds_security_group_tags" {
  description = "tags to add "
  type        = map(any)
  default     = null
}

variable "rds_ingresses" {
    description = "List of ingress rules to create by name"
    type = list(object({ 
      from_port       = number
      to_port         = number
      protocol        = string
      description     = string
      cidr_blocks     = list(string)
      security_groups = list(string)
      self            = bool
    }))
    default           = []
  }

variable "rds_egresses" {
    description = "List of egress rules to create by name"
    type = list(object({ 
      from_port       = number
      to_port         = number
      protocol        = string
      description     = string
      cidr_blocks     = list(string)
      security_groups = list(string)
      self            = bool
    }))
    default           = []
  }

# EC2
variable "ami" {
  description = "ID of AMI to use for the instance"
  type        = string
  default     = null
}

variable "instance_type" {
  description = "The type of instance to start"
  type        = string
  default     = "t3.micro"
}

variable "subnet_id" {
  description = "The VPC Subnet ID to launch in"
  type        = string
  default     = null
}

variable "key_name" {
  description = "Key name of the Key Pair to use for the instance; which can be managed using the `aws_key_pair` resource"
  type        = string
  default     = null
}

variable "monitoring" {
  description = "If true, the launched EC2 instance will have detailed monitoring enabled"
  type        = bool
  default     = true
}

variable "additional_security_groups" {
  description = "A list of additional security group IDs to associate with"
  type        = list(string)
  default     = null
}

variable "root_block_device" {
  description = "Customize details about the root block device of the instance. See Block Devices below for details"
  type        = list(any)
  default     = []
}

variable "ebs_block_device" {
  description = "Additional EBS block devices to attach to the instance"
  type        = list(map(string))
  default     = []
}

variable "volume_tags" {
  description = "A mapping of tags to assign to the devices created by the instance at launch time"
  type        = map(string)
  default     = {}
}

variable "sg_tags" {
  description = "A map of tags to add to the ec2 instance created"
  type        = map(string)
  default     = {}
}


# Security group
variable "security_group_name" {
  description = "security group name"
  type        = string
  default     = ""
}

variable "security_group_description" {
  description = "security group description"
  type        = string
  default     = ""
}

variable "vpc_id" {
  description = "vpc ID"
  type        = string
  default     = ""
}

variable "security_group_tags" {
  description = "tags to add "
  type        = map(any)
  default     = null
}

variable "ingresses" {
    description = "List of ingress rules to create by name"
    type = list(object({ 
      from_port       = number
      to_port         = number
      protocol        = string
      description     = string
      cidr_blocks     = list(string)
      security_groups = list(string)
      self            = bool
    }))
    default           = []
  }

  variable "egresses" {
    description = "List of egress rules to create by name"
    type = list(object({ 
      from_port       = number
      to_port         = number
      protocol        = string
      description     = string
      cidr_blocks     = list(string)
      security_groups = list(string)
      self            = bool
    }))
    default           = []
  }

# S3 Buckets


# Databases
