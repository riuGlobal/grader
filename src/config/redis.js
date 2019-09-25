import Ioredis from 'ioredis'

const redis = new Ioredis({
  port: process.env.portRedis,
  host: process.env.hostRedis,
  family: 4, // 4 (IPv4) or 6 (IPv6)
  db: process.env.dbRedis
})

redis.connect(() => {
  console.log(' [-] Redis UP & Running')
})

export default redis
