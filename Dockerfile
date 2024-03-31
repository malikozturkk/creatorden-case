FROM node:18

COPY . /application
WORKDIR /application

COPY package.json yarn.lock ./

RUN yarn install


COPY . .


RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]