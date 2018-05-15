import express from 'express';
import morgan from 'morgan';
import v1Routes from './v1';

const startStatusApi = (port, store) => {
  const app = express();

  app.use(morgan('combined'));
  app.use('/v1', v1Routes(express.Router(), store));

  app.listen(port);
};

export default startStatusApi;
