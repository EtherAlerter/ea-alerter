import status from './status';
import subscriptions from './subscriptions';

const routes = (router, store) => {
  router.get('/status', status(store));
  router.get('/subscriptions', subscriptions(store));
  return router;
};

export default routes;
