locals {
  name_prefix = "${var.project}-${var.environment}"
}

data "aws_caller_identity" "current" {}

#Generate a secret token
resource "random_password" "secret_token" {
  length           = 12
  special          = true
  override_special = "!#$%&*()-_=+[]{}<>:?"
}

#Push the random password to Aws Secret Manager
resource "aws_secretsmanager_secret" "secret_token" {
  name                    = "/eapd/ecs/${var.environment}/JWT_SECRET"
  recovery_window_in_days = var.recovery_window_in_days
}

resource "aws_secretsmanager_secret_version" "secret_token" {
  secret_id      = aws_secretsmanager_secret.secret_token.id
  secret_string  = random_password.secret_token.result
  
}

module "ecs-fargate-service" {
  source              = "./modules/fargate"
  name_prefix         = local.name_prefix
  project             = var.project
  team                = var.team
  region              = var.region
  environment         = var.environment
  aws_account         = var.aws_account
  task_secrets_policy_name = var.task_secrets_policy_name
  
  vpc_id              = var.vpc_id
  vpc_public_subnets  = var.public_subnets
  vpc_private_subnets = var.private_subnets

  web_image           = var.web_image
  api_image           = var.api_image

  web_definitions = {
    "TEALIUM_ENV" = "dev"
  }
  api_definitions = {
    "API_PORT" = "8001",
    "API_URL" = "/api",
    "PORT" = "8001"
  }
  web_secrets = [
     {
      name: "OKTA_CLIENT_ID",
      valueFrom: "arn:aws:secretsmanager:us-east-1:${data.aws_caller_identity.current.account_id}:secret:/eapd/ecs/dev/apI_definition-DhHcRi"
    },
    {
      name: "OKTA_API_KEY",
      valueFrom: "arn:aws:secretsmanager:us-east-1:${data.aws_caller_identity.current.account_id}:secret:/eapd/ecs/dev/apI_definition-DhHcRi"
    },
    {
      name: "LD_API_KEY",
      valueFrom: "arn:aws:secretsmanager:us-east-1:${data.aws_caller_identity.current.account_id}:secret:/eapd/ecs/dev/apI_definition-DhHcRi"
    },
    {
      name: "LD_CLIENT_ID",
      valueFrom: "arn:aws:secretsmanager:us-east-1:${data.aws_caller_identity.current.account_id}:secret:/eapd/ecs/dev/apI_definition-DhHcRi"
    },
    {
      name: "TEALIUM_TAG",
      valueFrom: "arn:aws:secretsmanager:us-east-1:${data.aws_caller_identity.current.account_id}:secret:/eapd/ecs/dev/apI_definition-DhHcRi"
    },
    {
      name: "SNYK_API_KEY",
      valueFrom: "arn:aws:secretsmanager:us-east-1:${data.aws_caller_identity.current.account_id}:secret:/eapd/ecs/dev/apI_definition-DhHcRi"
    },
    {
      name: "OKTA_SERVER_ID",
      valueFrom: "arn:aws:secretsmanager:us-east-1:${data.aws_caller_identity.current.account_id}:secret:/eapd/ecs/dev/apI_definition-DhHcRi"
    },
    {
      name: "OKTA_DOMAIN",
      valueFrom: "arn:aws:secretsmanager:us-east-1:${data.aws_caller_identity.current.account_id}:secret:/eapd/ecs/dev/OKTA_DOMAIN-fGZrNh"
    }

  ]
  api_secrets = [
    {
      name: "API_DATABASE_URL",
      valueFrom: "arn:aws:secretsmanager:us-east-1:${data.aws_caller_identity.current.account_id}:secret:/eapd/ecs/dev/apI_definition-DhHcRi"
    },
    {
      name: "LD_API_KEY",
      valueFrom: "arn:aws:secretsmanager:us-east-1:${data.aws_caller_identity.current.account_id}:secret:/eapd/ecs/dev/apI_definition-DhHcRi"
    },
    {
      name: "LD_CLIENT_ID",
      valueFrom: "arn:aws:secretsmanager:us-east-1:${data.aws_caller_identity.current.account_id}:secret:/eapd/ecs/dev/apI_definition-DhHcRi"
    },
    {
      name: "MONGO_URL",
      valueFrom: "arn:aws:secretsmanager:us-east-1:${data.aws_caller_identity.current.account_id}:secret:/eapd/ecs/dev/apI_definition-DhHcRi"
    },
    {
      name: "OKTA_API_KEY",
      valueFrom: "arn:aws:secretsmanager:us-east-1:${data.aws_caller_identity.current.account_id}:secret:/eapd/ecs/dev/apI_definition-DhHcRi"
    },
    {
      name: "OKTA_CLIENT_ID",
      valueFrom: "arn:aws:secretsmanager:us-east-1:${data.aws_caller_identity.current.account_id}:secret:/eapd/ecs/dev/apI_definition-DhHcRi"
    },
    {
      name: "OKTA_SERVER_ID",
      valueFrom: "arn:aws:secretsmanager:us-east-1:${data.aws_caller_identity.current.account_id}:secret:/eapd/ecs/dev/apI_definition-DhHcRi"
    },
    {
      name: "JWT_SECRET",
      valueFrom: "${aws_secretsmanager_secret.secret_token.arn}"
    },
    {
      name: "OKTA_DOMAIN",
      valueFrom: "arn:aws:secretsmanager:us-east-1:${data.aws_caller_identity.current.account_id}:secret:/eapd/ecs/dev/OKTA_DOMAIN-fGZrNh"
    }
  ]

  web_health_check_path   = "/"
  api_health_check_path   = "/api/heartbeat"  
}
