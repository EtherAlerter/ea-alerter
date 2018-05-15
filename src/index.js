import * as amqp from 'amqplib/callback_api';
import Web3 from 'web3';
import { config } from 'dotenv';
import logger from './log';
import { initializeStore, actions } from './store';
import connectToQueue from './alerter-queue';
import onControlMessage from './control-message-listener';
import watchForNewBlocks from './block-watcher';
import subscriptionTester from './subscription-tester';
import evaluateContractExpression from './evaluator/index';
import startStatusApi from './status';

config();

const {
  EA_ETHEREUM_ENDPOINT = 'http://localhost:7545',
  EA_RABBITMQ_ENDPOINT = 'amqp://localhost',
  EA_STATUS_PORT = 8080,
} = process.env;

const run = async () => {
  const log = logger('ALERT');

  log.info('Initializing web3...');
  const web3 = new Web3(new Web3.providers.HttpProvider(EA_ETHEREUM_ENDPOINT));

  log.info('Initializing store...');
  const store = initializeStore(log);

  log.info('Initializing status API...');
  startStatusApi(EA_STATUS_PORT, store);

  log.info('Connecting to control message queue...');
  const controlQueue = await connectToQueue(
    log,
    amqp,
    EA_RABBITMQ_ENDPOINT,
    'apiToAlerter',
    (name) => { store.dispatch(actions.setQueueAlive(name)); },
  );
  store.dispatch(actions.setControlQueueAlive());

  log.info('Connecting to dispatch message queue...');
  const notificationQueue = await connectToQueue(
    log,
    amqp,
    EA_RABBITMQ_ENDPOINT,
    'alerterToDispatcher',
    (name) => { store.dispatch(actions.setQueueAlive(name)); },
  );
  store.dispatch(actions.setNotificationQueueAlive());

  log.info('Watching for new blocks...');
  watchForNewBlocks(
    web3,
    subscriptionTester(
      web3,
      store,
      notificationQueue,
      evaluateContractExpression(web3),
    ),
  );
  store.dispatch(actions.setBlockWatcherAlive());

  log.info('Subscribing to control queue...');
  await controlQueue.subscribe(onControlMessage(log, store, actions));
  store.dispatch(actions.setControlQueueSubscribed());

  log.info(`Running. Status API listening on port ${EA_STATUS_PORT}`);
};

run();
