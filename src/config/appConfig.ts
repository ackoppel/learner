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
    ignore_expiration: process.env.IGNORE_EXPIRATION,
  },
  alchemy: {
    key: process.env.ALCHEMY_API_KEY,
  },
  etherScan: {
    key: process.env.ETHERSCAN_API_KEY,
  },
  sync: {
    enabled: process.env.SYNC,
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
    token_price: process.env.TOKEN_PRICE_CRON,
    coin_price: process.env.COIN_PRICE_CRON,
    token_balance: process.env.TOKEN_BALANCE_CRON,
    coin_balance: process.env.COIN_BALANCE_CRON,
    token_details: process.env.TOKEN_DETAILS_CRON,
  },
  bullBoard: {
    basePath: process.env.BASE_PATH,
    username: process.env.BULLBOARD_USER,
    password: process.env.BULLBOARD_PASSWORD,
  },
});
