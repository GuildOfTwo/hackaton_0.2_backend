const router = require('express').Router()
const auth = require('../middlewares/auth')
const { NotFoundError } = require('../utils/errors')
const { login, createUser, logout } = require('../controllers/users')

router.post('/signin', login)
router.post('/signup', createUser)

router.use(auth)

router.post('/signout', logout)
router.use('/users', usersRouter)

router.use((req, res, next) => {
  next(new NotFoundError())
})

module.exports = router
