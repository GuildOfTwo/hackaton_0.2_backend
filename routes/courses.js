const router = require('express').Router()
const {
  getCourses,
  updateCourse,
  createCourse,
  getCourse,
  deleteCourse,
} = require('../controllers/courses')

router.get('/', getCourses)
router.post('/', createCourse)
router.get('/:courseId', getCourse)
router.patch('/:courseId', updateCourse)
router.delete('/:courseId', deleteCourse)

module.exports = router
