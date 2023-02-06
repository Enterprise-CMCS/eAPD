data "aws_ami" "latest_silver_image" {
    most_recent = true
    owners = ["582599238767"]
        filter {
            name = "name"
            values = ["eAPD Preview AMI*"]
        }
        filter {
            name   = "virtualization-type"
            values = ["hvm"]
        }
}

resource "aws_instance" "eapd_jumpbox_bb" {
    ami                         = data.aws_ami.latest_silver_image.id
    instance_type               = "t3.medium"
    key_name                    = "eapd_bbrooks"
    vpc_security_group_ids      = [ "sg-084cef5d95e485fd4", "sg-0f3c6bfa62fcefa4a", "sg-02271e574628f901f"]
    subnet_id                   = "subnet-04c22c81fd7060c13"
    root_block_device {
      encrypted = true
    }
#    metadata_options {
#        http_tokens = "required"
#    }
    associate_public_ip_address = false
    tags = {
        Name = "eAPD Jumpbox BB"
        "Patch Group" = "RHEL7"
        "cms-cloud-exempt:open-sg" = "CLDSPT-5877"
        "Patch Window" = "ITOPS-Wave1-Non-Mktplc-Prod-MW"
        Terraform = "True"        
    }   
}

resource "aws_instance" "eapd_jumpbox_tf" {
    ami                         = data.aws_ami.latest_silver_image.id
    instance_type               = "t3.medium"
    key_name                    = "tforkner_eapd"
    vpc_security_group_ids      = [ "sg-084cef5d95e485fd4", "sg-0f3c6bfa62fcefa4a", "sg-02271e574628f901f"]
    subnet_id                   = "subnet-04c22c81fd7060c13"
    root_block_device {
      encrypted = true
    }
#    metadata_options {
#        http_tokens = "required"
#    }
    associate_public_ip_address = false
    tags = {
        Name = "eAPD Jumpbox TF"
        "Patch Group" = "RHEL7"
        "cms-cloud-exempt:open-sg" = "CLDSPT-5877"
        "Patch Window" = "ITOPS-Wave1-Non-Mktplc-Prod-MW"
        Terraform = "True"
    }
}
resource "aws_instance" "eapd_jumpbox_tb" {

    ami                         = data.aws_ami.latest_silver_image.id
    instance_type               = "t3.medium"
    key_name                    = "tbolt-eapd"
    vpc_security_group_ids      = [ "sg-084cef5d95e485fd4", "sg-0f3c6bfa62fcefa4a", "sg-02271e574628f901f"]
    subnet_id                   = "subnet-04c22c81fd7060c13"
    root_block_device {
      encrypted = true
    }
    metadata_options {
        http_tokens = "required"
    }
    associate_public_ip_address = false
    tags = {
        Name = "eAPD Jumpbox TB"
        "Patch Group" = "RHEL7"
        "cms-cloud-exempt:open-sg" = "CLDSPT-5877"
        "Patch Window" = "ITOPS-Wave1-Non-Mktplc-Prod-MW"
        Terraform = "True"
    }   
}

resource "aws_instance" "eapd_jumpbox_nz" {

    ami                         = data.aws_ami.latest_silver_image.id
    instance_type               = "t3.medium"
    key_name                    = "eapd_bbrooks" #Needs valid keypair, placeholder until NZ creates one
    vpc_security_group_ids      = [ "sg-084cef5d95e485fd4", "sg-0f3c6bfa62fcefa4a", "sg-02271e574628f901f"]
    subnet_id                   = "subnet-04c22c81fd7060c13"
    root_block_device {
      encrypted = true
    }
    metadata_options {
        http_tokens = "required"
    }
    associate_public_ip_address = false
    tags = {
        Name = "eAPD Jumpbox NZ"
        "Patch Group" = "RHEL7"
        "cms-cloud-exempt:open-sg" = "CLDSPT-5877"
        "Patch Window" = "ITOPS-Wave1-Non-Mktplc-Prod-MW"
        Terraform = "True"
    }
}
