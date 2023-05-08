# Build docker image.
# Sử dung node
FROM node:16-alpine as node

# Khai báo tham số
ARG workdir=.
LABEL description="deploy react app"

# Khái báo workdir trong node.
WORKDIR /app

# Copy project vào trong workdir của node.
COPY ${workdir}/ /app/

# Cài đặt các thư viện node liên quan.
RUN yarn install

# Chạy lệnh build.
RUN yarn build

# Sử dụng nginx
FROM nginx:stable
# Copy folder đã được build vào folder chạy của nginx.
COPY --from=node /app/build/ /var/www/dist/

# Copy file cấu hình chạy cho nginx (file nginx.conf sẽ tạo ở bước tiếp theo)
COPY --from=node /app/nginx.conf /etc/nginx/nginx.conf

# Cài đặt curl cho câu lệnh check HEALTH
RUN apt-get update && apt-get install -y curl

# Kiểm tra trạng thái của container sau khi chạy
HEALTHCHECK --interval=1m --timeout=3s \
    CMD curl -f http://localhost || exit 1

CMD ["nginx", "-g", "daemon off;"]
