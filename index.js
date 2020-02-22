#!/usr/bin/env node
'use strict'

const AMQP = require('amqplib')
const uuid = require('uuid/v4')

const {
  RABBITMQ_HOST: host = 'localhost',
  RABBITMQ_PORT: port = '5672',
  RABBITMQ_QUEUE: queue = 'tasks'
} = process.env

const getConnection = (exports.getChannel = async () => {
  const connection = await AMQP.connect(`amqp://${host}:${port}`)
  const channel = await connection.createChannel()
  await channel.assertQueue(queue)
  return { channel, connection }
})

const publish = (exports.publish = async (message = 'Hello, World!') => {
  const { channel, connection } = await getConnection()
  const msg = {
    id: uuid(),
    msg: message
  }
  await channel.publish('', queue, Buffer.from(JSON.stringify(msg)))
  await channel.close()
  await connection.close()
  return msg
})

const consume = (exports.consume = async () => {
  const { channel, connection } = await getConnection()
  const msg = await channel.get(queue, { noAck: true })
  await channel.close()
  await connection.close()
  return msg && JSON.parse(msg.content.toString())
})

if (require.main === module) {
  const [, , command = 'publish', ...args] = process.argv
  void (async function main() {
    if (Reflect.has(exports, command)) {
      console.log(await exports[command](...args))
    }
  })().catch(err => {
    console.error(err)
    process.exit(1)
  })
}
