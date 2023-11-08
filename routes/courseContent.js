const router = require('express').Router()
const { addCourseContent } = require('../controllers/courseContent')

router.post('/', addCourseContent)

module.exports = router
