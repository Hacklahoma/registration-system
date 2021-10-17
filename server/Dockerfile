FROM node:16-alpine

# Configure Server
WORKDIR /app

RUN mkdir -p node_modules

COPY package*.json yarn.* ./

RUN apk add --no-cache git

COPY . .

RUN chown -R node:node /home/node

RUN npm install

USER node

EXPOSE 3333

CMD ["npm", "run", "dev"]
