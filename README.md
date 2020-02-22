> minimal RabbitMQ publish + consume demo in Node.js

## quickstart

```
$ git clone git@github.com:knksmith57/rabbitmq-producer-consumer rabbitmq-producer-consumer \
  && cd $_

## start RabbitMQ server on :5672 + web GUI on :8080
$ docker-compose up -d rabbitmq
```

## usage

**note**: RabbitMQ takes a hot minute to spin up before accepting connections on `:5672`, so start it first (as show above) before publishing + consuming messages.

```bash
$ compose run --rm app publish
Starting rabbitmq-producer-consumer_rabbitmq_1 ... done
{ id: '8a5bc6c2-1d12-4b0e-9f6c-fa7037f55cb7', msg: 'Hello, World!' }

$ compose run --rm app consume
Starting rabbitmq-producer-consumer_rabbitmq_1 ... done
{ id: '8a5bc6c2-1d12-4b0e-9f6c-fa7037f55cb7', msg: 'Hello, World!' }

## or supply your own message
$ compose run --rm app publish 'hello, jessica'
Starting rabbitmq-producer-consumer_rabbitmq_1 ... done
{ id: '1c1fbf46-2af6-4387-be1b-3ef8f2575d1e', msg: 'hello, jessica' }

$ compose run --rm app consume
Starting rabbitmq-producer-consumer_rabbitmq_1 ... done
{ id: '1c1fbf46-2af6-4387-be1b-3ef8f2575d1e', msg: 'hello, jessica' }
```
