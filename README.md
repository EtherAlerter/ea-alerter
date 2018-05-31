[![Build Status](https://travis-ci.org/EtherAlerter/ea-alerter.svg?branch=master)](https://travis-ci.org/EtherAlerter/ea-alerter)
[![Coverage Status](https://coveralls.io/repos/github/EtherAlerter/ea-alerter/badge.svg?branch=master)](https://coveralls.io/github/EtherAlerter/ea-alerter?branch=master)

# EtherAlerter Alerter Service

Nothing to see here. Move along.

## Running

    $> yarn
    $> yarn start

To query the service status:

    $> curl http://localhost:8080/v1/status

## Testing

    $> yarn test[:coverage]
    $> yarn lint

## End-to-End Testing

    $> yarn e2e

## Packaging

    $> yarn build
    $> yarn start:container

## POC

Old code. You can probably ignore.

    $> git checkout poc
    $> yarn
    $> yarn start

