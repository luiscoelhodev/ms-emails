FROM node:18-alpine

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install

COPY ./dist/src .

EXPOSE 3000

CMD ["npm", "run", "start"]
