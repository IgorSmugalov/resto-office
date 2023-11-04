FROM node:20-alpine

WORKDIR /app

COPY package*.json .

RUN npm install

CMD ["npx", "nx", "run", "api:serve:development"]
