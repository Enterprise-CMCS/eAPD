variable "eAPD" {
    type = "map"
    description = "IaC for eAPD Enviornments"
    default = {
        test = "eapd-terraform-test"
        impl = "eapd-terraform-impl"
        prod = "eapd-terraform-prod"
    }
}

variable "aws_region" {}
  
variable "env" {
    description = "Environment to deploy to"
  
}