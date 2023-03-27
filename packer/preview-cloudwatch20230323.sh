#!/bin/bash

# Become root user to perform installation and configuration
sudo su <<R_USER
#!/bin/bash
export MONGO_DATABASE="$MONGO_DATABASE"
export MONGO_INITDB_ROOT_USERNAME="$MONGO_INITDB_ROOT_USERNAME"
export MONGO_INITDB_ROOT_PASSWORD="$MONGO_INITDB_ROOT_PASSWORD"
export MONGO_INITDB_DATABASE="$MONGO_INITDB_DATABASE"
export MONGO_DATABASE_USERNAME="$MONGO_DATABASE_USERNAME"
export MONGO_DATABASE_PASSWORD="$MONGO_DATABASE_PASSWORD"
export MONGO_ADMIN_URL="$MONGO_ADMIN_URL"
export DATABASE_URL="$DATABASE_URL"
export OKTA_DOMAIN="$OKTA_DOMAIN"
export OKTA_API_KEY="$OKTA_API_KEY"
export ENVIRONMENT="$ENVIRONMENT"
export TERM="xterm"

# Configure CloudWatch Agent
mkdir -p /opt/aws/amazon-cloudwatch-agent/doc/
touch /opt/aws/amazon-cloudwatch-agent/doc/app-logs.json
cat <<CWAPPLOGCONFIG > /opt/aws/amazon-cloudwatch-agent/doc/app-logs.json
{
  "logs": {
    "logs_collected": {
      "files": {
        "collect_list": [
          {
            "file_path": "/app/api/logs/eAPD-API-error-0.log*",
            "log_group_name": "preview/app/api/logs/eAPD-API-error-0.log"
          },
          {
            "file_path": "/app/api/logs/eAPD-API-out-0.log*",
            "log_group_name": "preview/app/api/logs/eAPD-API-out-0.log"
          },
          {
            "file_path": "/app/api/logs/eAPD-API-*",
            "log_group_name": "preview/app/api/logs/eAPD-API-combined-0.log"
          },
          {
            "file_path": "/var/log/mongodb/mongo.log*",
            "log_group_name": "preview/app/api/logs/eAPD-API-combined-0.log"
          },              
          {
            "file_path": "/app/api/logs/Database-migration-error.log*",
            "log_group_name": "preview/app/api/logs/Database-migration-error.log"
          },
          {
            "file_path": "/app/api/logs/Database-migration-out.log*",
            "log_group_name": "preview/app/api/logs/Database-migration-out.log"
          },
          {
            "file_path": "/app/api/logs/Database-migration-*",
            "log_group_name": "preview/app/api/logs/Database-migration-combined.log"
          },          
          {
            "file_path": "/app/api/logs/Database-seeding-error.log*",
            "log_group_name": "preview/app/api/logs/Database-seeding-error.log"
          },
          {
            "file_path": "/app/api/logs/Database-seeding-out.log*",
            "log_group_name": "preview/app/api/logs/Database-seeding-out.log"
          },
          {
            "file_path": "/app/api/logs/Database-seeding-*",
            "log_group_name": "preview/app/api/logs/Database-seeding-combined.log"
          },                                           
          {
            "file_path": "/app/api/logs/cms-hitech-apd-api.logs*",
            "log_group_name": "preview/app/api/logs/cms-hitech-apd-api.logs"              
          }    
        ]
      }
    }
  }
}
CWAPPLOGCONFIG

# Nginx is test/preview only
touch /opt/aws/amazon-cloudwatch-agent/doc/var-log.json
cat <<CWVARLOGCONFIG > /opt/aws/amazon-cloudwatch-agent/doc/var-log.json
{
  "logs": {
    "logs_collected": {
      "files": {
        "collect_list": [
          {
            "file_path": "/var/log/aide/aide.log*",
            "log_group_name": "preview/var/log/aide/aide.log"
          },
          {
            "file_path": "/var/log/audit/audit.log*",
            "log_group_name": "preview/var/log/audit/audit.log"
          },
          {
            "file_path": "/var/log/awslogs.log*",
            "log_group_name": "preview/var/log/awslogs.log"
          },
          {
            "file_path": "/var/log/cloud-init.log*",
            "log_group_name": "preview/var/log/cloud-init.log"
          },
          {
            "file_path": "/var/log/cloud-init-output.log*",
            "log_group_name": "preview/var/log/cloud-init-output.log"
          },
          {
            "file_path": "/var/log/cron*",
            "log_group_name": "preview/var/log/cron"
          },
          {
            "file_path": "/var/log/dmesg*",
            "log_group_name": "preview/var/log/dmesg"
          },
          {
            "file_path": "/var/log/maillog*",
            "log_group_name": "preview/var/log/maillog"
          },
          {
            "file_path": "/var/log/messages*",
            "log_group_name": "preview/var/log/messages"
          },
          {
            "file_path": "/var/log/nginx/access.log*",
            "log_group_name": "preview/var/log/nginx/access.log"
          },
          {
            "file_path": "/var/log/nginx/error.log*",
            "log_group_name": "preview/var/log/nginx/error.log"
          },
          {
            "file_path": "/var/log/secure*",
            "log_group_name": "preview/var/log/secure"
          },
          {
            "file_path": "/var/log/mongodb/mongod.log*",
            "log_group_name": "preview/var/log/mongodb/mongod.log"
          }                    
        ]
      }
    }
  }
}
CWVARLOGCONFIG

touch /opt/aws/amazon-cloudwatch-agent/doc/var-opt.json
cat <<CWVAROPTCONFIG > /opt/aws/amazon-cloudwatch-agent/doc/var-opt.json
{
  "logs": {
    "logs_collected": {
      "files": {
        "collect_list": [
          {
            "file_path": "/var/opt/ds_agent/diag/ds_agent.log*",
            "log_group_name": "preview/var/opt/ds_agent/diag/ds_agent.log"
          },
          {
            "file_path": "/var/opt/ds_agent/diag/ds_agent-err.log*",
            "log_group_name": "preview/var/opt/ds_agent/diag/ds_agent-err.log"
          },
          {
            "file_path": "/var/opt/ds_agent/diag/ds_am.log*",
            "log_group_name": "preview/var/opt/ds_agent/diag/ds_am.log"
          }
        ]
      }
    }
  }
}

CWVAROPTCONFIG

/opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl -a append-config -m ec2 -s -c file:/opt/aws/amazon-cloudwatch-agent/doc/app-logs.json

/opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl -a append-config -m ec2 -s -c file:/opt/aws/amazon-cloudwatch-agent/doc/var-log.json

/opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl -a append-config -m ec2 -s -c file:/opt/aws/amazon-cloudwatch-agent/doc/var-opt.json
R_USER