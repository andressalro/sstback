FROM node:14 AS build

WORKDIR /app

COPY package*.json ./
COPY swagger.yaml ./

RUN npm install

COPY . .

RUN npm run build

FROM node:14-alpine

WORKDIR /app

COPY --from=build /app/package*.json ./
COPY --from=build /app/dist ./dist
COPY --from=build /app/swagger.yaml ./

RUN npm install --only=production

RUN apk add --no-cache bash

EXPOSE 3000
