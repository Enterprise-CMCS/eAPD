output "db_subnet_group_name" {
  description = "The db subnet group name"
  value = aws_db_subnet_group.db-subnet-group.id
}