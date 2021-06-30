import { ConfigHelper } from './config.helper';

export const appConfig = () => ({
  db: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expires: process.env.EXPIRES,
    ignore_expiration: ConfigHelper.stringToBoolean(
      process.env.IGNORE_EXPIRATION,
    ),
  },
  alchemy: {
    key: process.env.ALCHEMY_API_KEY,
  },
  etherScan: {
    key: process.env.ETHERSCAN_API_KEY,
  },
  sync: {
    enabled: ConfigHelper.stringToBoolean(process.env.SYNC),
  },
  queue: {
    limiter: process.env.QUEUE_LIMITER,
    duration: process.env.QUEUE_LIMITER_DURATION,
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
    db: process.env.REDIS_DB,
  },
  cron: {
    price: process.env.PRICE_CRON,
    balance: process.env.BALANCE_CRON,
    token_details: process.env.TOKEN_DETAILS_CRON,
  },
  bullBoard: {
    basePath: process.env.BASE_PATH,
    username: process.env.BULLBOARD_USER,
    password: process.env.BULLBOARD_PASSWORD,
  },
});
