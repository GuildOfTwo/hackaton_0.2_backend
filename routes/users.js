const router = require('express').Router()
const {
  createUser,
  updateUser,
  getAllUsers,
  getUser,
  getProfile,
} = require('../controllers/users')

router.get('/', getAllUsers)
router.get('/me', getProfile)
router.get('/:userId', getUser)
router.post('/', createUser)
router.patch('/:userId', updateUser)

module.exports = router
