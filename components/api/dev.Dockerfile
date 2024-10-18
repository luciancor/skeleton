FROM --platform=linux/amd64 node:21-alpine3.18 as build
ENV TZ Europe/Berlin
WORKDIR /app
COPY package.json yarn.lock /app/
RUN yarn install
COPY src /app/
EXPOSE 8080
ENTRYPOINT  ["yarn", "run:local"]
