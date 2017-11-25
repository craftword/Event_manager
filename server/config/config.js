const dotenv = require('dotenv').config();

module.exports = {
  development: {
    dialect: 'postgres',
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_USERNAME,
    url:process.env.DATABASE_URL,
    host: process.env.DATABASE_HOST,
 },
  test: {
    username: process.env.TEST_USERNAME,
    password: process.env.TEST_PASSWORD,
    database: process.env.TEST_USERNAME,
    url:process.env.TEST_URL,
    host: process.env.TEST_HOST,
    dialect: 'postgres'
  },
  production: {
    dialect: 'postgres',
    url:process.env.HEROKU_POSTGRESQL_PURPLE_URL
  }
};