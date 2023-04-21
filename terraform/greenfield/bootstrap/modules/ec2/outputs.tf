output "id" {
  description = "The ID of the instance"
  value       = aws_instance.mongoDB-instance.id
}
output "instance_state" {
  description = "The state of the instance. One of: `pending`, `running`, `shutting-down`, `terminated`, `stopping`, `stopped`"
  value       = aws_instance.mongoDB-instance.instance_state
}
output "private_ip" {
  description = "The private IP address assigned to the instance."
  value       = aws_instance.mongoDB-instance.private_ip
}

output "public_ip" {
  description = "The public IP address assigned to the instance"
  value       = aws_instance.mongoDB-instance.public_ip
}

