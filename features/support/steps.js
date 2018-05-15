import { Given, Then } from 'cucumber';
import { expect } from 'chai';
import fetch from 'node-fetch';

Given('a running alerter', () => {
});

Then('the status endpoint will report that all is well', () => fetch('http://localhost:8080/v1/status')
  .then((res) => {
    expect(res.status).to.equal(200);
    return res.json();
  }).then((body) => {
    expect(body).to.deep.equal({
      message: 'ea-alerter is alive',
      status: {
        blockWatcher: 'ok',
        controlQueue: 'ok',
        controlQueueSubscription: 'ok',
        notificationQueue: 'ok',
      },
    });
  }));

Then('it will have no subscriptions', () => fetch('http://localhost:8080/v1/subscriptions')
  .then((res) => {
    expect(res.status).to.equal(200);
    return res.json();
  }).then((body) => {
    expect(body).to.deep.equal([]);
  }));
