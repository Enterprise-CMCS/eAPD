resource "aws_security_group" "allow-external" {
  description = "Allows external traffic"

  egress {
    cidr_blocks = ["0.0.0.0/0"]
    from_port   = "0"
    protocol    = "-1"
    self        = "false"
    to_port     = "0"
  }
  ingress {
    cidr_blocks = ["10.0.0.0/8"]
    from_port   = "443"
    protocol    = "tcp"
    self        = "false"
    to_port     = "443"
  }

  ingress {
    cidr_blocks = ["10.0.0.0/8"]
    from_port   = "8080"
    protocol    = "tcp"
    self        = "false"
    to_port     = "8080"
  }

  ingress {
    cidr_blocks = ["10.0.0.0/8"]
    from_port   = "8000"
    protocol    = "tcp"
    self        = "false"
    to_port     = "8000"
  }

  ingress {
    cidr_blocks = ["10.0.0.0/8"]
    from_port   = "8001"
    protocol    = "tcp"
    self        = "false"
    to_port     = "8001"
  }

  ingress {
    cidr_blocks = ["10.0.0.0/8"]
    from_port   = "80"
    protocol    = "tcp"
    self        = "false"
    to_port     = "80"
  }

  name   = "${var.name_prefix}_allow-external-ecs"
  vpc_id = var.vpc_id
}