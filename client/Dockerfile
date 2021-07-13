FROM node:current-alpine

# Configure Client
WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
