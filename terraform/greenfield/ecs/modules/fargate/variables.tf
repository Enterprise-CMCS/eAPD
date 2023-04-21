# General
variable "name_prefix" {
  type        = string
  description = "Prefix to apply to resources"
}

variable "project" {
  default     = ""
  description = "Project, aka the application name"
}

variable "environment" {
  default     = ""
  description = "Environment for deployment"
}

variable "team" { 
  default = "" 
  description = "Team name"
}

variable "region" {
  default     = ""
  description = "AWS region for resources"
}


# Networking Info
variable "vpc_id" {
  description = "VPC ID to use for the resources"
}

variable "vpc_public_subnets" {
  type        = list(any)
  description = "Public Subnets for VPC"
}

variable "vpc_private_subnets" {
  type        = list(any)
  description = "Private Subnets for VPC"
}



# ECS Info
variable "ecs_cluster" {
  default     = null
  description = "ECS Cluster name to deploy the service"
}

variable "platform_version" {
  default     = "1.4.0"
  description = "Platform version on which to run your service"
}

variable "web_cpu" {
  default     = 512
  type        = number
  description = "Number of cpu units used by the task"
}

variable "web_memory" {
  default     = 1024
  type        = number
  description = "Amount (in MiB) of memory used by the task"
}

variable "api_cpu" {
  default     = 512
  type        = number
  description = "Number of cpu units used by the task"
}

variable "api_memory" {
  default     = 1024
  type        = number
  description = "Amount (in MiB) of memory used by the task"
}

variable "web_replicas" {
  default     = "1"
  description = "Number of containers (instances) to run for web"
}

variable "api_replicas" {
  default     = "1"
  description = "Number of containers (instances) to run for api"
}

variable "deployment_maximum_percent" {
  default     = "200"
  description = "Max percentage of the service's desired count during deployment"
}

variable "deployment_minimum_healthy_percent" {
  default     = "100"
  description = "Min percentage of the service's desired count during deployment"
}


# Healthcheck
variable "web_health_check_path" {
  default     = "/"
  description = "Service health endpoint to check"
}

variable "api_health_check_path" {
  default     = "/api"
  description = "API service health endpoint to check"
}

variable "web_path" {
  default     = "/*"
  description = "Path to configure the alb listener"
}

variable "api_path" {
  default     = "/api/*"
  description = "Path to configure the alb listener"
}

variable "web_port" {
  default     = 80
  type        = number
  description = "Port the application runs on"
}

variable "api_port" {
  default     = 8001
  type        = number
  description = "API port the application runs on"
}


# Permissions
variable "task_iam_policy" {
  default     = ""
  description = "Policy document for ecs task"
}

variable "web_definitions" {
  description = "Map of environment variables for the application"
}

variable "api_definitions" {
  description = "Map of environment variables for the api"
}

variable "web_secrets" {
  type        = list(any)
  default     = []
  sensitive   = true
  description = "List of sensative data to inject into the container definitions"
}

variable "api_secrets" {
  type        = list(any)
  default     = []
  sensitive   = true
  description = "List of sensative data to inject into the container definitions"
}

variable "health_check_grace_period_seconds" {
  default     = "120"
  description = "Seconds to ignore failing load balancer health checks on new tasks"
}


# Docker Images
variable "web_image" {
  type        = string
  description = "Docker image name with tag for web"
}

variable "api_image" {
  type        = string
  description = "Docker image name with tag for api"
}

variable "aws_account" {
  description = "AWS account number"
  default = ""
}

variable "task_secrets_policy_name" {
  default     = ""
  description = "task secrets policy name"
  type        = string
}