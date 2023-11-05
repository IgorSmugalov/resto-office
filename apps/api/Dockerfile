FROM node:20-alpine

WORKDIR /app

COPY package*.json .
COPY tools/prisma ./tools/prisma

RUN npm ci
RUN npx prisma generate
