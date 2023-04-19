output "application_endpoint" {
  description = "Endpoint for application"
  value       = module.ecs-fargate-service.load_balancer_endpoint
}