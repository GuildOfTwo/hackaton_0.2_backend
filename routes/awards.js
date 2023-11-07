const router = require('express').Router()
const {
  getAwards,
  getAward,
  updateAward,
  createAward,
} = require('../controllers/awards')

router.get('/', getAwards)
router.post('/', createAward)
router.get('/:awardId', getAward)
router.patch('/:awardId', updateAward)

module.exports = router
