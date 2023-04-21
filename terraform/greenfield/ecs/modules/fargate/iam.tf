data "aws_caller_identity" "current" {}

resource "aws_iam_role" "task" {
  name = "${var.name_prefix}-task-role"
  path = "/delegatedadmin/developer/" # please remove if policy boundary is not needed
  assume_role_policy = data.aws_iam_policy_document.ecs_tasks_assume_role.json 
  permissions_boundary  = "arn:aws:iam::${data.aws_caller_identity.current.account_id}:policy/cms-cloud-admin/developer-boundary-policy" # please remove if permission boundary is not required
}

data "aws_iam_policy_document" "ecs_tasks_assume_role" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["ecs-tasks.amazonaws.com"]
    }
  }
}

resource "aws_iam_role_policy_attachment" "task" {
  role       = aws_iam_role.task.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

resource "aws_iam_role_policy_attachment" "task-secrets" {
  role       = aws_iam_role.task.name
  policy_arn = "arn:aws:iam::${var.aws_account}:policy/delegatedadmin/developer/${var.task_secrets_policy_name}" # update path if policy boundary is not needed
}



