FROM node:20-alpine

WORKDIR /app

COPY package*.json .
COPY libs/prisma ./libs/prisma

RUN npm install
RUN npx prisma generate
