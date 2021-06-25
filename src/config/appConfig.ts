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
});
