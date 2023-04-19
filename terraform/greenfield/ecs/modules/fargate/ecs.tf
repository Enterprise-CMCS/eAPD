resource "aws_ecs_cluster" "cluster" {
  name = var.name_prefix
  setting {
    name  = "containerInsights"
    value = "enabled"
  }
}

resource "aws_ecs_cluster_capacity_providers" "cluster" {
  cluster_name       = aws_ecs_cluster.cluster.name
  capacity_providers = ["FARGATE"]
}

resource "aws_ecs_service" "web_service" {
  name                               = "${var.name_prefix}-web"
  cluster                            = aws_ecs_cluster.cluster.id
  desired_count                      = var.web_replicas
  wait_for_steady_state              = true
  deployment_maximum_percent         = var.deployment_maximum_percent
  deployment_minimum_healthy_percent = var.deployment_minimum_healthy_percent
  enable_ecs_managed_tags            = "false"
  health_check_grace_period_seconds  = var.health_check_grace_period_seconds
  launch_type                        = "FARGATE"
  platform_version                   = var.platform_version
  scheduling_strategy                = "REPLICA"
  task_definition                    = aws_ecs_task_definition.web.arn
  enable_execute_command             = true

  deployment_controller {
    type = "ECS"
  }

  load_balancer {
    container_name   = "${var.name_prefix}-web"
    container_port   = var.web_port
    target_group_arn = aws_lb_target_group.web.arn
  }

  network_configuration {
    assign_public_ip = "true"
    security_groups  = [aws_security_group.allow-external.id]
    subnets          = var.vpc_public_subnets
  }

  depends_on = [
    aws_ecs_task_definition.web,
    aws_lb.lb
  ]
}

resource "aws_ecs_service" "api_service" {
  name                               = "${var.name_prefix}-api"
  cluster                            = aws_ecs_cluster.cluster.id
  desired_count                      = var.api_replicas
  wait_for_steady_state              = true
  deployment_maximum_percent         = var.deployment_maximum_percent
  deployment_minimum_healthy_percent = var.deployment_minimum_healthy_percent
  enable_ecs_managed_tags            = "false"
  health_check_grace_period_seconds  = var.health_check_grace_period_seconds
  launch_type                        = "FARGATE"
  platform_version                   = var.platform_version
  scheduling_strategy                = "REPLICA"
  task_definition                    = aws_ecs_task_definition.api.arn
  enable_execute_command             = true

  deployment_controller {
    type = "ECS"
  }

  load_balancer {
    container_name   = "${var.name_prefix}-api"
    container_port   = var.api_port
    target_group_arn = aws_lb_target_group.api.arn
  }

  network_configuration {
    assign_public_ip = "true"
    security_groups  = [aws_security_group.allow-external.id]
    subnets          = var.vpc_private_subnets
  }

  depends_on = [
    aws_ecs_task_definition.api,
    aws_lb.lb
  ]
}

resource "aws_cloudwatch_log_group" "ecs_web_logs" {
  name = "${var.name_prefix}-web-logs"

  tags = {
    Project     = var.project
    Environment = var.environment
    Team        = var.team
  }
}

resource "aws_cloudwatch_log_group" "ecs_api_logs" {
  name = "${var.name_prefix}-api-logs"

  tags = {
    Project     = var.project
    Environment = var.environment
    Team        = var.team
  }
}

resource "aws_ecs_task_definition" "web" {
  execution_role_arn       = aws_iam_role.task.arn
  family                   = "${var.name_prefix}-web"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  task_role_arn            = aws_iam_role.task.arn
  cpu                      = var.web_cpu
  memory                   = var.web_memory
  container_definitions = jsonencode([
    {
      name  = "${var.name_prefix}-web"
      image = var.web_image
      logConfiguration = {
        logDriver = "awslogs"
        options = {
          awslogs-group         = "${var.name_prefix}-web-logs",
          awslogs-region        = "us-east-1",
          awslogs-stream-prefix = var.project,
          awslogs-create-group  = "true"
        }
      }
      portMappings = [
        {
          containerPort = var.web_port
          hostPort      = var.web_port
          protocol      = "tcp"
        }
      ]
      essential   = true
      environment = local.web_definitions
      secrets     = var.web_secrets
    }
    ]
  )
}

resource "aws_ecs_task_definition" "api" {
  execution_role_arn       = aws_iam_role.task.arn
  family                   = "${var.name_prefix}-api"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  task_role_arn            = aws_iam_role.task.arn
  cpu                      = var.api_cpu
  memory                   = var.api_memory
  container_definitions = jsonencode([
    {
      name  = "${var.name_prefix}-api"
      image = var.api_image
      logConfiguration = {
        logDriver = "awslogs"
        options = {
          awslogs-group         = "${var.name_prefix}-api-logs",
          awslogs-region        = "us-east-1",
          awslogs-stream-prefix = var.project,
          awslogs-create-group  = "true"
        }
      }
      portMappings = [
        {
          containerPort = var.api_port
          hostPort      = var.api_port
          protocol      = "tcp"
        }
      ]
      essential   = true
      environment = local.api_definitions
      secrets     = var.api_secrets
    }
    ]
  )
}

locals {
  web_definitions = flatten([
    for k, v in var.web_definitions : [
      {
        name  = k
        value = v
      }
    ]
  ])
}

locals {
  api_definitions = flatten([
    for k, v in var.api_definitions : [
      {
        name  = k
        value = v
      }
    ]
  ])
}
