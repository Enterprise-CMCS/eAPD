variable "eapd_slack_webhook_url" {}
variable "eapd_slack_channel" {}
variable "eapd_slack_username" {}

terraform {
  backend "s3" {
    bucket         = "eapd-terraform-state"
    key            = "eapd_main_terraform.tfstate"
    region         = "us-east-1"
    ### Potential future use, allows for resource locking to prevent collisions from multiple users 
    # Replace this with your DynamoDB table name!
    #dynamodb_table = "terraform-up-and-running-locks"
    #encrypt        = true
  }
  required_version = "~> 1.3"
}

provider "aws" {
    region = "us-east-1"
    profile = ""
}

module "buckets" {
    source = "./modules/buckets"
}

data "aws_sns_topic" "aws_500x_errors" {
  name = "HTTPCode_ELB_5XX_Count_Alarms"
}

module "notify_slack" {
  source = "../../terraform-aws-notify-slack" # Hardcoded local path

  sns_topic_name   = data.aws_sns_topic.aws_500x_errors.name
  create_sns_topic = false

  slack_webhook_url = var.eapd_slack_webhook_url
  slack_channel     = var.eapd_slack_channel
  slack_username    = var.eapd_slack_username

  tags = {
    Name = "notify-slack-simple"
  }

  depends_on = [data.aws_sns_topic.aws_500x_errors]
}
