output "load_balancer_endpoint" {
  description = "endpoint for loadbalancer"
  value       = aws_lb.lb.dns_name
}