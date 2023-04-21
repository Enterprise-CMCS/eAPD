
variable "tags" {
  description = "tags to add "
  type        = map(any)
  default     = {}
}

variable "identifier" {
  description = "The name of the RDS instance"
  type = string
}

variable "additional_security_groups" {
  description = "List of additional security group ids to attach to the DB"
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
  #default     = true
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

# Cloudwatch Log group
variable "create_cloudwatch_log_group" {
  description = "Determines whether a CloudWatch log group is created for each `enabled_cloudwatch_logs_exports`"
  type        = bool
  default     = false
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

