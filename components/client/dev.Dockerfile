FROM --platform=linux/amd64 node:21-alpine3.18 as build
WORKDIR /app 
COPY package.json yarn.lock /app/
RUN yarn install
COPY src /app/
EXPOSE 3000
ENTRYPOINT  ["yarn", "start"]
