environment              = "dev"
subject_claim_filters    = ["repo:Enterprise-CMCS/eAPD:*"]
github_actions_roles     = [
    {
        role_name: "github_ecs_dev_role",
        description: "github actions ecs dev role ",
        policy_name: "github_actions_ecs_dev_pipline_policy",
        role_permissions_policy_json_path: "environments/dev/ecs_permission_policy.json"
    }
]

#rds
#rds
identifier             = "eapd-dev"
engine                 = "postgres"
engine_version         = "13.7"
instance_class         = "db.t3.large"
allocated_storage      = 100
db_name                = "eapd-dev-db"
username               = "postgres"
port                   = 5432
subnet_group_name      = "eapd-dev-subnet-group"
parameter_group_name   = "postgres13"
family                 = "postgres13"
subnet_ids             = [ "subnet-01c495bc99a10d98b", "subnet-05f418b1af86a8610" ]
skip_final_snapshot       = true
final_snapshot_identifier = "eapd-dev-postgres"
deletion_protection       = false
aws_secretsmanager_secret_name = "eapd-dev-postgres-pass"
recovery_window_in_days   = 0
enabled_cloudwatch_logs_exports = [ "postgresql", "upgrade" ]

#rds security group
rds_security_group_name         = "eapd-dev-rds-sg"
rds_security_group_description  = "eapd-dev-rds-sg"
rds_security_group_tags = {
        Name: "eapd-dev-rds-sg"
}

rds_ingresses = [
    {
        from_port       = 5432
        to_port         = 5432
        protocol        = "tcp"
        description     = "db port"
        cidr_blocks     = [ "10.240.236.128/25", "10.240.236.0/25", "10.240.237.0/25", "10.0.0.0/8"]
        self            = false
        security_groups = []
    }

]
rds_egresses = [
    {
        from_port       = 0
        to_port         = 0
        protocol        = "-1"
        description     = "default egresses"
        cidr_blocks     = [ "0.0.0.0/0" ]
        self            = false
        security_groups = []
    }
]


#EC2
instance_type                  = "t3a.large"
subnet_id                      = "subnet-0f98328f0e04ca493"
additional_security_groups     = []
key_name                       = "eapd-dev"
monitoring                     = true
tags = {
        Name: "mdb ec2 instance"
}

volume_tags = {
        Name: "mdb ec2 instance volume"
}

root_block_device = [
    {
        volume_size: "100"
    }
] 
ebs_block_device = [
    {
        volume_size: "100"
        device_name: "/dev/sdc"
    }
]

vpc_id                      = "vpc-00871580886ad7b56"
security_group_name         = "mdn-sg"
security_group_description  = "mdb instance"
security_group_tags = {
        Name: "mdb sgs"
}

ingresses = [
    {
        from_port       = 22
        to_port         = 22
        protocol        = "tcp"
        description     = "ssh"
        cidr_blocks     = [ "10.0.0.0/8"]
        self            = false
        security_groups = []

    },
    {
        from_port       = 27017
        to_port         = 27017
        protocol        = "tcp"
        description     = "db port"
        cidr_blocks     = [ "10.240.236.128/25", "10.240.236.0/25", "10.240.237.0/25", "10.0.0.0/8"]
        self            = false
        security_groups = []
    }

]
egresses = [
    {
        from_port       = 0
        to_port         = 0
        protocol        = "-1"
        description     = "default egresses"
        cidr_blocks     = [ "0.0.0.0/0" ]
        self            = false
        security_groups = []
    }
]

