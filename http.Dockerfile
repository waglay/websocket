FROM node:lts-alpine AS build
WORKDIR /app
COPY package*.json .
RUN npm install

FROM node:lts-alpine 
WORKDIR /app
COPY --from=build /app /app
COPY ./server.js /app/
ENTRYPOINT ["node","server.js"] 