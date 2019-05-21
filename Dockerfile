# base image
FROM node:8 as builder

# set working directory
WORKDIR /opt/app

# install and cache app dependencies
COPY package.json ./
RUN npm install --silent

COPY . .

# start app
RUN [ "npm", "run", "build" ]


# Stage 2 - the production environment
FROM nginx:1.14-alpine
WORKDIR /var/www/app

EXPOSE 80
COPY --from=builder /opt/app/build .
COPY nginx-config/webapp.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]