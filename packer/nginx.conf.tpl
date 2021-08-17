user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log;
pid /run/nginx.pid;
# Load dynamic modules. See /usr/share/nginx/README.dynamic.
include /usr/share/nginx/modules/*.conf;
events {
    worker_connections 1024;
}
http {
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';
    access_log  /var/log/nginx/access.log  main;
    sendfile            on;
    tcp_nopush          on;
    tcp_nodelay         on;
    keepalive_timeout   65;
    types_hash_max_size 2048;
    include             /etc/nginx/mime.types;
    default_type        application/octet-stream;

    # Allow larger than normal headers
    client_header_buffer_size 64k;
    large_client_header_buffers 4 64k;
    server {
        listen       443 default_server ssl;
        listen       [::]:443 default_server ssl;
        server_name  _;
        root         /app/web;
        ssl_certificate     /app/tls/server.crt;
        ssl_certificate_key /app/tls/server.key;
        location /api/ {
          proxy_pass http://localhost:8000/;
        }
        location / {
          # For requests without a file extension, send the requested path if
          # it exists, otherwise send index.html to achieve push state routing
          try_files $uri /index.html;
        }
        location ~ ^.+\..+$ {
          # For requests with file extensions, send them if the file exists,
          # otherwise send a 404.
          try_files $uri =404;
        }
    }
}
