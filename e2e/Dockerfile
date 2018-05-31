FROM node:9

RUN mkdir -p /var/app

WORKDIR /var/app

COPY package.json .
COPY yarn.lock .
RUN yarn --pure-lockfile

COPY . .

CMD ["yarn", "start"]
