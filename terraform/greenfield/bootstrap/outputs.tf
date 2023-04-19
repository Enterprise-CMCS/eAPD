# github oidc
output "oidc_iam_role_arns"{
  description = "OIDC role arn"
  value       =  module.actions-aws-oidc-provider.role_arn
}

# ecr repository for web
output "web_ecr_repository" {
  description = "web ecr repository url"
  value       = aws_ecr_repository.web-ecr.repository_url
}

# ecr repository for api
output "api_ecr_repository" {
  description = "api ecr repository url"
  value       = aws_ecr_repository.api-ecr.repository_url
}

output "db_endpoint" {
  description = "The endpoint of the RDS database"
  value = module.aws-rds.db_endpoint
}

output "task_secret_policy_arn" {
  description = "policy arn of task secrets policy "
  value = aws_iam_policy.task_secrets.arn
}