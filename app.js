const express = require('express')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const { PORT, DB_PATH, BASE_URL, MAX_AUTH_ATTEMPTS } = require('./utils/config')
const { USER_MESSAGE, DEFAULT_ERROR_MESSAGES } = require('./utils/consts')
const cookieParser = require('cookie-parser')


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


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`${USER_MESSAGE.APP_RUN} ${PORT}`)
})