const express = require('express')
const helmet = require('helmet')
const responseTime = require('response-time')
const rateLimit = require('express-rate-limit')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const { PORT, MAX_AUTH_ATTEMPTS } = require('./utils/config')
const { requestLogger, errorLogger } = require('./middlewares/logger')
const { USER_MESSAGE, DEFAULT_ERROR_MESSAGES } = require('./utils/consts')
const errorsHandler = require('./middlewares/handelError')
const routes = require('./routes')

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
// app.use(authLimiter)
// app.use(cors())
app.use(
  cors({
    origin: 'http://localhost:5173',
    allowedHeaders: 'Content-Type, Authorization, Set-Cookie',
    credentials: true,
  })
)
app.use(responseTime(requestLogger))
app.use(routes)

app.use(errorLogger)
app.use(errorsHandler)

app.listen(PORT, () => {
  console.log(`${USER_MESSAGE.APP_RUN} ${PORT}`)
})
