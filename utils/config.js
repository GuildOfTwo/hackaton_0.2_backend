const { config } = require('dotenv')

if (process.env.NODE_ENV === 'production') {
  config()
}

const {
  PORT = 3000,
  BASE_URL = 'http://localhost',
  JWT_SECRET = process.env.NODE_ENV === 'production'
    ? process.env.JWT_SECRET
    : 'd6f90191f6bd0ef30b5901d6ce69d1cc71263c121ade0e2ad379035cb152c640',
  LOGGER_BASE_URL = 'http://localhost:3100',
  MAX_AUTH_ATTEMPTS = process.env.NODE_ENV === 'production'
    ? process.env.MAX_AUTH_ATTEMPTS
    : 500,
  NODE_ENV,
} = process.env

module.exports = {
  PORT,
  BASE_URL,
  JWT_SECRET,
  LOGGER_BASE_URL,
  MAX_AUTH_ATTEMPTS,
  NODE_ENV,
}