const { prisma } = require('../utils/prisma')
const { handleError } = require('../utils/errors')

const addUserCourse = (req, res, next) => {
  const { userId, courseId, ...addData } = req.body
  return prisma.userCourses
    .create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        course: {
          connect: {
            id: courseId,
          },
        },
        ...addData,
      },
    })
    .then((userCourse) => res.status(201).send(userCourse))
    .catch((err) => handleError(err, next))
}
const updateUserCourse = (req, res, next) => {
  const { userCourseId } = req.params
  return prisma.userCourses
    .update({
      where: {
        id: +userCourseId,
      },
      ...req.body,
    })
    .then((userCourse) => res.send(userCourse))
    .catch((err) => handleError(err, next))
}

module.exports = {
  addUserCourse,
  updateUserCourse,
}
