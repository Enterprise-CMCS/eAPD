
resource "aws_db_subnet_group" "db-subnet-group" {

  name        = var.name
  description = format("%s subnet group", var.name)
  subnet_ids  = var.subnet_ids

  tags = merge(
    var.tags,
    {
      "Name" = var.name
    },
  )
}