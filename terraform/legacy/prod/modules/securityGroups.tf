data "aws_vpc" "HI-C-dev-vpc" {
  id = "vpc-00a77739f6d1c4175"
}

resource "aws_security_group" "eapd-production-mongo-ec2" {
  name        = "eapd-production-mongo-ec2"
  description = "Mongo instance security group"
  vpc_id      = data.aws_vpc.HI-C-dev-vpc.id

  ingress {
    description = "Mongo Traffic from Jumpbox"
    from_port   = 27017
    to_port     = 27019
    protocol    = "tcp"
    security_groups = ["sg-0f3c6bfa62fcefa4a"]
  }

  ingress {
    description = "SSH Access from Jumpbox"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    security_groups = ["sg-0f3c6bfa62fcefa4a"]
  }

  ingress {
    description = "Mongo Traffic from Production Instance"
    from_port   = 27017
    to_port     = 27019
    protocol    = "tcp"
    security_groups = ["sg-0293d2860afa7fd89"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "eapd-production-mongo-ec2"
    Terraform = "Yes"
  }
}

resource "aws_security_group" "eapd-pro-dbprotect-mongo" {
  name        = "eapd-prod-allow-dbprotect-mongo"
  description = "Mongo instance security group"
  vpc_id      = data.aws_vpc.HI-C-dev-vpc.id

  ingress {
    description = "Mongo Access for DB Protect"
    from_port   = 27017
    to_port     = 27019
    protocol    = "tcp"
    cidr_blocks = ["10.223.125.0/24", "10.242.216.0/24", "10.203.143.0/25"]
  }

  tags = {
    Name = "eapd-prod-allow-dbprotect-mongo"
    Terraform = "Yes"
  }
}

resource "aws_security_group" "eapd-pro-dbprotect-postgres" {
  name        = "eapd-prod-allow-dbprotect-postgres"
  description = "Postgres instance security group"
  vpc_id      = data.aws_vpc.HI-C-dev-vpc.id

  ingress {
    description = "Postgres Access for DB Protect"
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["10.223.125.0/24", "10.242.216.0/24", "10.203.143.0/25"]
  }

  tags = {
    Name = "eapd-prod-allow-dbprotect-postgres"
    Terraform = "Yes"
  }
}