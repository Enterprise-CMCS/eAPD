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

variable "tags" {
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