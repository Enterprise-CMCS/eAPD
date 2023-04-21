output "db_endpoint" {
  description = "The endpoint of the RDS database"
  value = aws_db_instance.db.endpoint
}