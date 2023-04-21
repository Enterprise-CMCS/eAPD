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

variable "tags" {
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