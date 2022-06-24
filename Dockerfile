FROM node:14-alpine3.10
RUN apk update
RUN apk add curl vim
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN mkdir -p /var/www/src/text_volume
EXPOSE 3000
CMD [ "npm", "run", "start"]