FROM node:17.3.1-alpine3.15
EXPOSE 3000
WORKDIR /app
COPY build/ /app/
CMD ["/app/node_modules/next/dist/bin/next", "start"]
