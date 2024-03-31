FROM node:18

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install

RUN yarn build

COPY . .

RUN npx prisma generate

EXPOSE 3000

CMD ["yarn", "start"]