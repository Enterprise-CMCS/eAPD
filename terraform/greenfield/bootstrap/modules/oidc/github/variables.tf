variable "subject_claim_filters" {
  description = "A list of valid subject claim filters" 
  type        = list(string)
}

variable "audience_list" {
  description = "A list of allowed audiences (AKA client IDs) for the AWS identity provider"
  type        = list(string)
  default     = ["sts.amazonaws.com"] # the default audience for the GitHub OIDC provider, see https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services#adding-the-identity-provider-to-aws
}

variable "thumbprint_list" {
  description = " A list of thumbprints for the OIDC identity provider's server certificate"
  type        = list(string)
  default     = ["6938fd4d98bab03faadb97b34396831e3780aea1"] # see https://github.blog/changelog/2022-01-13-github-actions-update-on-oidc-based-deployments-to-aws/ and https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_create_oidc_verify-thumbprint.html
}

variable github_actions_roles {
  description = "list of roles"
  type        = list(object({

    role_name: string
    description: string
    policy_name: string
    role_permissions_policy_json_path: string
  
  }))
  default = []
}