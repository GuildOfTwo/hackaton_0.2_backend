const router = require('express').Router()
const { addUserAward } = require('../controllers/usersAwards')

router.post('/', addUserAward)

module.exports = router
