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

Docker-ethized version coming soon. For now:

1. In the ea-queues project folder, run `yarn build && yarn start`.
2. Ensure an Ethereum client like Ganache is running and exposing a JSON-RPC server on port 7545.
3. In this project folder, run `yarn test:e2e`.

## Packaging

    $> yarn build

## POC

Old code. You can probably ignore.

    $> git checkout poc
    $> yarn
    $> yarn start

