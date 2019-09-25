const connection = {
  protocol: 'amqp',
  hostname: process.env.hostRabbit,
  port: 5672,
  username: 'guest',
  password: 'guest',
  locale: 'en_US',
  frameMax: 0,
  heartbeat: 0,
  vhost: '/'
}

export default connection
