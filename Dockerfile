FROM node:hydrogen-slim

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

CMD ["npm run build && npm run start:prod"]