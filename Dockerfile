FROM node:9

ARG rabbitMqEndpoint=amqp://rabbitmq

RUN mkdir -p /var/app

WORKDIR /var/app

COPY package.json .
COPY yarn.lock .
RUN yarn --pure-lockfile

COPY . .

ENV EA_RABBITMQ_ENDPOINT ${rabbitMqEndpoint}

CMD ["yarn", "start"]
