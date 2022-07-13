# Building stage
FROM node:current AS builder

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

# Serving stage
FROM nginx:alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=builder /app/build .

ENTRYPOINT ["nginx", "-g", "daemon off;"]