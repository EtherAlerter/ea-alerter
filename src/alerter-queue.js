import R from 'ramda';

const connect = (log, amqp, url, name) => () => new Promise((resolve, reject) => {
  log.info(`Connecting to ${url}/${name}...`);
  amqp.connect(url, (error, connection) => {
    if (error) {
      reject(error);
    } else {
      log.info('Creating channel...');
      connection.createChannel((err, channel) => {
        if (err) {
          reject(err);
        } else {
          log.info(`Asserting queue ${name}...`);
          channel.assertQueue(name, { durable: false });
          resolve({
            send: (msg) => {
              channel.sendToQueue(name, msg);
            },
            subscribe: (onMsg) => {
              channel.consume(name, (m) => {
                onMsg(JSON.parse(m.content.toString()));
              }, { noAck: true });
            },
          });
        }
      });
    }
  });
});

const rejectDelay = t => reason => new Promise((resolve, reject) => {
  setTimeout(reject.bind(null, reason), t);
});

const connectToQueue = (log, amqp, url, name, options = {}) => {
  const retryCount = options.retryCount || 5;
  const retryDelay = options.retryDelay || 5000;
  let p = Promise.reject();
  for (let i = 0; i < retryCount; i += 1) {
    p = p.catch(connect(log, amqp, url, name)).then(R.identity).catch(rejectDelay(retryDelay));
  }
  return p;
};

export default connectToQueue;
