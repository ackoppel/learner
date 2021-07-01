import * as Joi from '@hapi/joi';

export const configValidationSchema = Joi.object({
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().default(5432).required(),

  JWT_SECRET: Joi.string().required(),
  EXPIRES: Joi.string().required(),
  IGNORE_EXPIRATION: Joi.boolean().required(),

  ALCHEMY_API_KEY: Joi.string().required(),

  ETHERSCAN_API_KEY: Joi.string().required(),

  REDIS_HOST: Joi.string().required(),
  REDIS_PORT: Joi.number().default(6379).required(),
  REDIS_PASSWORD: Joi.string().required(),
  REDIS_DB: Joi.number().default(0).required(),

  SYNC: Joi.boolean().required(),
  QUEUE_LIMITER: Joi.number().required(),
  QUEUE_LIMITER_DURATION: Joi.number().required(),

  PRICE_CRON: Joi.string().required(),
  BALANCE_CRON: Joi.string().required(),
  TOKEN_DETAILS_CRON: Joi.string().required(),

  BULLBOARD_USER: Joi.string().required(),
  BULLBOARD_PASSWORD: Joi.string().required(),

  BASE_PATH: Joi.string().required(),
});
