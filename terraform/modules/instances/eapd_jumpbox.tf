/*
variable "eapd_jumpbox_ami" {}
variable "eapd_jumpbox_instance_type" {}
variable "eapd_jumpbox_key_name" {}
variable "eapd_jumpbox_vpc_security_group_ids" {}
variable "eapd_jumpbox_subnet_id" {}
variable "eapd_jumpbox_associate_public_ip_address" {}
*/

resource "aws_instance" "eapd_jumpbox" {
    ami = var.eapd_jumpbox_ami
    instance_type = var.eapd_jumpbox_instance_type
    key_name = var.eapd_jumpbox_key_name
    vpc_security_group_ids = var.eapd_jumpbox_vpc_security_group_ids
    subnet_id = var.eapd_jumpbox_subnet_id
    associate_public_ip_address = var.eapd_jumpbox_associate_public_ip_address
    tags = {
        Name = "eAPD Jumpbox"
    }
}