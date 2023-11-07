const router = require('express').Router()
const auth = require('../middlewares/auth')
const { NotFoundError } = require('../utils/errors')
const { login, createUser, logout } = require('../controllers/users')
const usersRouter = require('./users')
const categoriesRouter = require('./categories')
const coursesRouter = require('./courses')

router.post('/signin', login)
router.post('/signup', createUser)

router.use(auth)

router.post('/signout', logout)
router.use('/users', usersRouter)
router.use('/categories', categoriesRouter)
router.use('/courses', coursesRouter)

router.use((req, res, next) => {
  next(new NotFoundError())
})

module.exports = router
