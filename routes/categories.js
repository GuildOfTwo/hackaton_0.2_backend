const router = require('express').Router()
const {
  getAllCategories,
  getCategory,
  updateCategory,
  createCategory,
} = require('../controllers/categories')

router.get('/', getAllCategories)
router.post('/', createCategory)
router.get('/:categoryId', getCategory)
router.patch('/:categoryId', updateCategory)

module.exports = router
