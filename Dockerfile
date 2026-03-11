FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

EXPOSE 3888

ENV PARTY_PASSWORD=58156104

CMD ["node", "server.js"]
