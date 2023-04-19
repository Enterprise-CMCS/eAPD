data "aws_ami" "mongoDB-ami" {
  
  most_recent      = true
  #name_regex       = ""
  owners           = ["<replace_me_with_aws_account>"]

  filter {
    name   = "name"
    values = ["eAPD gf-dev Mongo AMI*"]
  }
  
}

module "ec2-sgs" {
    source                      = "../security-groups"
    vpc_id                      = var.vpc_id
    tags                        = var.security_group_tags
    ingresses                   = var.ingresses
    egresses                    = var.egresses
    security_group_name         = var.security_group_name
    security_group_description  = var.security_group_description   
}


resource "aws_instance" "mongoDB-instance" {

  ami                         = data.aws_ami.mongoDB-ami.id
  instance_type               = var.instance_type
  subnet_id                   = var.subnet_id
  vpc_security_group_ids      = concat([ module.ec2-sgs.security_group_id ], var.additional_security_groups )
  key_name                    = var.key_name
  monitoring                  = var.monitoring
  
  dynamic "root_block_device" {
    for_each = var.root_block_device
    content {
      volume_size           = lookup(root_block_device.value, "volume_size", null)
    }
  }

  dynamic "ebs_block_device" {
    for_each = var.ebs_block_device
    content {
      device_name           = lookup(ebs_block_device.value, "device_name", null)
      volume_size           = lookup(ebs_block_device.value, "volume_size", null)
    }
  }

  tags          = var.tags
  volume_tags   = var.volume_tags
}