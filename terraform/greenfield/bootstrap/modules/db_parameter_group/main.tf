resource "aws_db_parameter_group" "db-parameter-group" {

  name        = var.name
  description = format("%s parameter group", var.name)
  family      = var.family

  dynamic "parameter" {
    for_each = var.parameters
    content {
      name         = parameter.value.name
      value        = parameter.value.value
      apply_method = lookup(parameter.value, "apply_method", null)
    }
  }

  tags = merge(
    var.tags,
    {
      "Name" = var.name
    },
  )
}