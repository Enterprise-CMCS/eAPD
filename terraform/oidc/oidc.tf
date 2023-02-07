module "circleci-aws-oidc-provider" {
  source = "./modules/oidc"

  subject_claim_filters                      = var.subject_claim_filters
  audience_list                              = var.audience_list
  thumbprint_list                            = var.thumbprint_list
  url                                        = var.url
  oidc_provider_role_name                    = var.oidc_provider_role_name
  circleci_project_role                      = var.circleci_project_role
}


