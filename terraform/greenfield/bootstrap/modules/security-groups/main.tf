resource "aws_security_group" "sg" {
  name               = var.security_group_name
  description        = var.security_group_description
  vpc_id             = var.vpc_id
  tags               = var.tags

  dynamic "ingress" {
    for_each = var.ingresses 
    content {
      from_port       = ingress.value.from_port
      to_port         = ingress.value.to_port
      protocol        = ingress.value.protocol
      description     = ingress.value.description
      cidr_blocks     = ingress.value.cidr_blocks
      security_groups = ingress.value.security_groups
      self            = ingress.value.self
    }
  }

  dynamic "egress" {
    for_each = var.egresses
    content {
      from_port       = egress.value.from_port
      to_port         = egress.value.to_port
      protocol        = egress.value.protocol
      description     = egress.value.description
      cidr_blocks     = egress.value.cidr_blocks
      security_groups = egress.value.security_groups
      self            = egress.value.self
    }
  }
}