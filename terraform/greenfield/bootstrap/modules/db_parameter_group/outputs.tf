output "db_parameter_group_name" {
  description = "The db parameter group name"
  value = aws_db_parameter_group.db-parameter-group.id
}