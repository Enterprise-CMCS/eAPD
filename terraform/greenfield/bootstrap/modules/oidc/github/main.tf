data "aws_caller_identity" "current" {}

resource "aws_iam_openid_connect_provider" "github_actions" {
  client_id_list  = var.audience_list
  thumbprint_list = var.thumbprint_list
  url             = "https://token.actions.githubusercontent.com"
}

data "aws_iam_policy_document" "github_actions_assume_role" {
  statement {
    sid     = "RoleForGitHubActions"
    effect  = "Allow"
    actions = ["sts:AssumeRoleWithWebIdentity"]

    condition {
      test     = "StringEquals"
      variable = "token.actions.githubusercontent.com:aud"
      values   = var.audience_list
    }

    condition {
      test     = "StringLike"
      variable = "token.actions.githubusercontent.com:sub"
      values   = var.subject_claim_filters
    }

    principals {
      type        = "Federated"
      identifiers = [aws_iam_openid_connect_provider.github_actions.arn]
    }
  }
}

resource "aws_iam_role" "github_actions_oidc_role" {
  for_each              = {for role in var.github_actions_roles: role.role_name => role}
  name                  = lookup(each.value, "role_name")
  description           = lookup(each.value, "description")
  assume_role_policy    = data.aws_iam_policy_document.github_actions_assume_role.json
  path                  = "/delegatedadmin/developer/"  # Please remove if permission boundary is not needed
  permissions_boundary  = "arn:aws:iam::${data.aws_caller_identity.current.account_id}:policy/cms-cloud-admin/developer-boundary-policy" # Please remove if permission boundary policy is not needed
}

resource "aws_iam_role_policy" "github_actions_permissions" {
  for_each              = {for role in var.github_actions_roles: role.role_name => role}
  name                  = lookup(each.value, "policy_name")
  role                  = aws_iam_role.github_actions_oidc_role[each.value.role_name].id
  policy                = file("${path.root}/${lookup(each.value, "role_permissions_policy_json_path")}")
}
