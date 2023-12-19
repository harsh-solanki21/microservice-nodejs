FROM node:20.10.0-alpine

WORKDIR /usr/src/app

COPY package*.json .

RUN pnpm i

COPY . .

EXPOSE 5003

CMD ["pnpm", "start"]
