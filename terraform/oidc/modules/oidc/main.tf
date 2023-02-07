data "aws_caller_identity" "current" {}

resource "aws_iam_openid_connect_provider" "oidc_provider" {
  client_id_list  = var.audience_list
  thumbprint_list = var.thumbprint_list
  url             = var.url
}

data "aws_iam_policy_document" "oidc_provider_assume_role" {
  statement {
    sid     = "RoleForCircleci"
    effect  = "Allow"
    actions = ["sts:AssumeRoleWithWebIdentity"]

    condition {
      test     = "ForAllValues:StringLike"
      variable = "oidc.circleci.com/org/b874a13f-2c70-4cd1-aaa6-edac8cc75526:aud"
      values   = var.audience_list
    }

    condition {
      test     = "ForAllValues:StringLike"
      variable = "token.actions.githubusercontent.com:sub"
      values   = var.subject_claim_filters
    }

    principals {
      type        = "Federated"
      identifiers = [aws_iam_openid_connect_provider.oidc_provider.arn]
    }
  }
}

resource "aws_iam_role" "oidc_provider_role" {
  name                  = var.oidc_provider_role_name
  description           = "A service role for use with AWS OIDC Provider"
  assume_role_policy    = data.aws_iam_policy_document.oidc_provider_assume_role.json
  #path and permssions boundary as required per https://cloud.cms.gov/creating-identity-access-management-policies
  path                  = "/delegatedadmin/developer/"
  permissions_boundary  = "arn:aws:iam::${data.aws_caller_identity.current.account_id}:policy/cms-cloud-admin/developer-boundary-policy"
}

resource "aws_iam_role" "circleci_project_role" {
  for_each             = {for project in var.circleci_project_role: project.role_name => project}
  name                 = lookup(each.value, "role_name")
  description          = lookup(each.value, "description")
  assume_role_policy   = data.aws_iam_policy_document.oidc_provider_assume_role.json
  # path and permssions boundary as required per https://cloud.cms.gov/creating-identity-access-management-policies
  path                 = "/delegatedadmin/developer/"
  permissions_boundary = "arn:aws:iam::${data.aws_caller_identity.current.account_id}:policy/cms-cloud-admin/developer-boundary-policy"
}

resource "aws_iam_role_policy" "circleci_project_policy" {
  for_each  = {for project in var.circleci_project_role: project.role_name => project}
  name      = lookup(each.value, "policy_name")
  role      = aws_iam_role.circleci_project_role[each.value.role_name].id
  policy    = file("${path.root}/${lookup(each.value, "project_permissions_policy_json_path")}")
}
