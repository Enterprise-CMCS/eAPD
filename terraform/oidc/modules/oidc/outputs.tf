
output "circleci_oidc_iam_provider_arn"{
  description = "The ARN of the AWS OIDC identity provider"
  value       =  aws_iam_openid_connect_provider.oidc_provider.arn
}
