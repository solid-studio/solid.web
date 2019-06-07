FROM node:8 as builder

WORKDIR /opt/app

COPY package.json package-lock.json ./

RUN npm install --silent

COPY . .

RUN [ "npm", "run", "build" ]

# Stage 2 - the production environment
FROM nginx:1.14-alpine

WORKDIR /var/www/app

EXPOSE 80

COPY --from=builder /opt/app/build .

COPY nginx-config/webapp.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]