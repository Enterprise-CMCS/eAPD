output "github_actions_oidc_iam_provider_arn"{
  description = "The ARN of the AWS OIDC identity provider"
  value       =  aws_iam_openid_connect_provider.github_actions.arn
}

output "role_arn"{
  value = {
    for k, role in aws_iam_role.github_actions_oidc_role : k => role.arn
  }
}

