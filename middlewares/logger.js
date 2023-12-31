const { createLogger, transports, format } = require('winston')
const LokiTransport = require('winston-loki')
const { LOGGER_BASE_URL, NODE_ENV } = require('../utils/config')

const logger = createLogger({
  transports: [
    NODE_ENV === 'production'
      ? new LokiTransport({
          host: LOGGER_BASE_URL,
          labels: { app: 'onboardy' },
          json: true,
          format: format.json(),
          replaceTimestamp: true,
          onConnectionError: (err) => console.error(err),
        })
      : new transports.Console({
          format: format.combine(format.simple(), format.colorize()),
        }),
  ],
})

const requestLogger = (req, res, time) => {
  logger.info({
    message: `method=${req.method} url=${req.url} status=${res.statusCode} duration=${time}ms`,
    labels: { origin: 'api' },
  })
}

const errorLogger = (err, req, res, next) => {
  logger.error({
    message: `method=${req.method} url=${req.url} status=${res.statusCode} error=${err.stack}`,
    labels: { origin: 'api' },
  })
  next(err)
}

module.exports = {
  requestLogger,
  errorLogger,
}
