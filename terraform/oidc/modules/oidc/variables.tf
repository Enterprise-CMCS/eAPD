variable "url"{
  description = "The URL of the identity provider"
  type        = string
  default     = ""
}
variable "subject_claim_filters" {
  description = "A list of valid subject claim filters" # see https://circleci.com/docs/openid-connect-tokens/
  type        = list(string)
}

variable "audience_list" {
  description = "A list of allowed audiences (AKA client IDs) for the AWS identity provider"
  type        = list(string)
  default     = [] # the default audience for the Circleci OIDC provider, see https://circleci.com/docs/openid-connect-tokens/
  }

variable "thumbprint_list" {
  description = " A list of thumbprints for the OIDC identity provider's server certificate"
  type        = list(string)
  default     = [] # see https://github.blog/changelog/2022-01-13-github-actions-update-on-oidc-based-deployments-to-aws/ and https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_create_oidc_verify-thumbprint.html
}

variable "oidc_provider_role_name"{
    description = "OIDC Identity Provider role name"
    type = string
}

variable circleci_project_role {
  description = "list of project roles"
  type        = list(object({

    role_name: string
    description: string
    policy_name: string
    project_permissions_policy_json_path: string
  
  }))
  default = []
}