[Unit]
Description=PM2 process manager
Documentation=https://pm2.keymetrics.io/
After=network.target

[Service]
Type=forking
User=ec2-user
LimitNOFILE=infinity
LimitNPROC=infinity
LimitCORE=infinity
Environment=PATH=/home/ec2-user/.nvm/versions/node/v10.23.3/bin:/usr/local/bin:/usr/bin:/usr/local/sbin:/usr/sbin:/opt/puppetlabs/bin:/home/ec2-user/.local/bin:/home/ec2-user/bin:/home/ec2-user/.nvm/versions/node/v10.23.3/bin:/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin
Environment=PM2_HOME=/home/ec2-user/.pm2
PIDFile=/home/ec2-user/.pm2/pm2.pid
Restart=on-failure

ExecStart=/home/ec2-user/.nvm/versions/node/v10.23.3/lib/node_modules/pm2/bin/pm2 resurrect
ExecReload=/home/ec2-user/.nvm/versions/node/v10.23.3/lib/node_modules/pm2/bin/pm2 reload all
ExecStop=/home/ec2-user/.nvm/versions/node/v10.23.3/lib/node_modules/pm2/bin/pm2 kill

[Install]
WantedBy=multi-user.target
