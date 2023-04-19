resource "aws_lb" "lb" {
  name               = "${substr(var.name_prefix, 0, 29)}-lb"
  load_balancer_type = "application"
  internal           = false
  subnets            = var.vpc_public_subnets

  security_groups = [aws_security_group.allow-external1.id]
}

resource "aws_security_group" "allow-external1" {
  description = "Allows external https traffic"

  egress {
    cidr_blocks = ["0.0.0.0/0"]
    from_port   = "0"
    protocol    = "-1"
    self        = "false"
    to_port     = "0"
  }

  ingress {
    cidr_blocks = ["0.0.0.0/0"]
    from_port   = "443"
    protocol    = "tcp"
    self        = "false"
    to_port     = "443"
  }

  ingress {
    cidr_blocks = ["0.0.0.0/0"]
    from_port   = "80"
    protocol    = "tcp"
    self        = "false"
    to_port     = "80"
  }

  name   = "${var.name_prefix}_allow-external"
  vpc_id = var.vpc_id
}

resource "aws_lb_listener" "lb_listener" {
  load_balancer_arn = aws_lb.lb.arn
  port              = "443"  
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-2016-08"
  certificate_arn   = "arn:aws:acm:us-east-1:894719201277:certificate/11b646b4-3b7c-444e-8f78-84b75e7e82de"


  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.web.arn
  }
}

resource "aws_lb_listener_rule" "lb_listner_rule" {
  listener_arn = aws_lb_listener.lb_listener.arn
  priority     = 100

  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.api.arn
  }

  condition {
    path_pattern {
      values = ["/api/*"]
    }
  }

}

resource "aws_lb_target_group" "web" {
  deregistration_delay = "30"

  health_check {
    enabled             = "true"
    healthy_threshold   = "2"
    interval            = "10"
    matcher             = "200" 
    path                = var.web_health_check_path
    port                = "traffic-port"
    protocol            = "HTTP"
    timeout             = "8"
    unhealthy_threshold = "10"
  }

  load_balancing_algorithm_type = "round_robin"
  name                          = "${substr(var.name_prefix, 0, 29)}-web-tg"
  port                          = var.web_port
  protocol                      = "HTTP"
  slow_start                    = "120"
  target_type                   = "ip"
  vpc_id                        = var.vpc_id

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_lb_target_group" "api" {
  deregistration_delay = "30"

  health_check {
    enabled             = "true"
    healthy_threshold   = "2"
    interval            = "10"
    matcher             = "204" 
    path                = var.api_health_check_path
    port                = "traffic-port"
    protocol            = "HTTP"
    timeout             = "8"
    unhealthy_threshold = "10"
  }

  load_balancing_algorithm_type = "round_robin"
  name                          = "${substr(var.name_prefix, 0, 29)}-api-tg"
  port                          = var.api_port
  protocol                      = "HTTP"
  slow_start                    = "120"
  target_type                   = "ip"
  vpc_id                        = var.vpc_id

  lifecycle {
    create_before_destroy = true
  }
}