module "instance" {
    source = "./modules/instances"

    eapd_jumpbox_ami = var.eapd_jumpbox_ami
    eapd_jumpbox_instance_type = var.eapd_jumpbox_instance_type
    eapd_jumpbox_key_name = var.eapd_jumpbox_key_name
    eapd_jumpbox_vpc_security_group_ids = var.eapd_jumpbox_vpc_security_group_ids
    eapd_jumpbox_subnet_id = var.eapd_jumpbox_subnet_id
    eapd_jumpbox_associate_public_ip_address = var.eapd_jumpbox_associate_public_ip_address
}