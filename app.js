const express = require('express')
const helmet = require('helmet')
const responseTime = require('response-time')
const rateLimit = require('express-rate-limit')
const cookieParser = require('cookie-parser')
const { PORT, DB_PATH, BASE_URL, MAX_AUTH_ATTEMPTS } = require('./utils/config')
const { requestLogger, errorLogger } = require('./middlewares/logger')
const { USER_MESSAGE, DEFAULT_ERROR_MESSAGES } = require('./utils/consts')
const errorsHandler = require('./middlewares/handelError')

const app = express()

const authLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: MAX_AUTH_ATTEMPTS,
  message: DEFAULT_ERROR_MESSAGES.MAX_LIMIT_REACHED,
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true,
})

app.use(helmet())
app.use(express.json())
app.use(cookieParser())
app.use(authLimiter)

app.use(responseTime(requestLogger))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(errorLogger)
app.use(errorsHandler)

app.listen(PORT, () => {
  console.log(`${USER_MESSAGE.APP_RUN} ${PORT}`)
})
