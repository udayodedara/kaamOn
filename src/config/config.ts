/* eslint-disable no-process-env */
export default () => ({
  database: {
    url: process.env.DATABASE_URL
  },
  jwt: {
    secret: process.env.JWT_SECRET
  },
  port: process.env.PORT && parseInt(process.env.PORT, 10)
});
