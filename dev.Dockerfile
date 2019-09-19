# base image
FROM node:10.16.3-jessie

# set working directory
WORKDIR /opt/app

# install and cache app dependencies
COPY package.json ./
RUN npm install
RUN npm install react-app-rewired:

COPY . .

# start app
CMD [ "npm", "start" ]