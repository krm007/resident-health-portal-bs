FROM nginx:1.15.5-alpine

ENV NODE_ENV=production

WORKDIR /www
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY build .
