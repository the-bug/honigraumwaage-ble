FROM nginx:1.15
COPY default.conf /etc/nginx/conf.d/default.conf

# Certificates
COPY nginx.crt /etc/ssl/certs/localhost.crt
COPY nginx.key /etc/ssl/private/localhost.key

# Copy frontend
COPY ./frontend-build/. /usr/share/nginx/html
