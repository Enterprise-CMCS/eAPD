data "aws_vpc" "HI-C-dev-vpc" {
  id = "vpc-00a77739f6d1c4175"
}

resource "aws_security_group" "eapd-staging-mongo-ec2" {
  name        = "eapd-staging-mongo-ec2"
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
    description = "Mongo Traffic from Staging Instance"
    from_port   = 27017
    to_port     = 27019
    protocol    = "tcp"
    security_groups = ["sg-01e01435dbbe6ce32"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "eapd-staging-mongo-ec2"
    Terraform = "Yes"
  }
}