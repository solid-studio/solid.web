FROM node:10.16.3-jessie as builder

WORKDIR /opt/app

ARG NPM_TOKEN

COPY .npmrc package.json package-lock.json ./

RUN npm install

COPY . .

RUN [ "npm", "run", "build" ]

# Stage 2 - the production environment
FROM nginx:1.14-alpine

WORKDIR /var/www/app

EXPOSE 80

COPY --from=builder /opt/app/build .

COPY nginx-config/webapp.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]