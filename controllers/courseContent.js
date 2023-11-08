const { prisma } = require('../utils/prisma')
const { handleError } = require('../utils/errors')

const addCourseContent = (req, res, next) => {
  const { courseId, ...addData } = req.body
  return prisma.courseContent
    .create({
      data: {
        course: {
          connect: {
            id: courseId,
          },
        },
        ...addData,
      },
    })
    .then((content) => res.status(201).send(content))
    .catch((err) => handleError(err, next))
}

module.exports = {
  addCourseContent,
}
