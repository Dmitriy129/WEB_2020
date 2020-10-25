FROM node

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 80
EXPOSE 443

CMD [ "node", "index.js" ]