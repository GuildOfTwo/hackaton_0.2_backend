const router = require('express').Router()
const {
  addUserCourse,
  updateUserCourse,
} = require('../controllers/userCourses')

router.post('/', addUserCourse)
router.patch('/:userCourseId', updateUserCourse)

module.exports = router
