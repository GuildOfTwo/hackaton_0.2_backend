const router = require('express').Router()
const {
  getCourses,
  updateCourse,
  createCourse,
  getCourse,
} = require('../controllers/courses')

router.get('/', getCourses)
router.post('/', createCourse)
router.get('/:courseId', getCourse)
router.patch('/:courseId', updateCourse)

module.exports = router
