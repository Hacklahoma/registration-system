FROM node:16-alpine

# Configure Client
WORKDIR /app

COPY package*.json ./

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]
