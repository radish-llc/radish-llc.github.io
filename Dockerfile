FROM nginx:alpine



# Remove default static config so it doesn't conflict on port 80
RUN rm -f /etc/nginx/conf.d/default.conf

# Copy template (Nginx automatically substitutes ${PORT} -> 8080 on boot)
COPY default.conf.template /etc/nginx/templates/default.conf.template


COPY . /usr/share/nginx/html/

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]