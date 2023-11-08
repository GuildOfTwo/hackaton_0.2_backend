const { prisma } = require('../utils/prisma')
const { handleError } = require('../utils/errors')

const createCourse = (req, res, next) => {
  const { categoryId, ...createData } = req.body
  console.log(categoryId)
  console.log(createData)
  return prisma.courses
    .create({
      data: {
        category: {
          connect: {
            id: categoryId,
          },
        },
        ...createData,
      },
    })
    .then((course) => res.status(201).send(course))
    .catch((err) => handleError(err, next))
}
const updateCourse = (req, res, next) => {
  const { courseId } = req.params
  const { categoryId, ...rest } = req.body
  const updateData = rest
  if (categoryId) updateData.category = { connect: { id: categoryId } }
  return prisma.courses
    .update({
      where: {
        id: +courseId,
      },
      data: updateData,
    })
    .then((course) => res.send(course))
    .catch((err) => handleError(err, next))
}
const getCourses = (req, res, next) =>
  prisma.courses
    .findMany({
      include: {
        category: true,
        CourseContent: true,
      },
    })
    .then((courses) => res.send(courses))
    .catch((err) => handleError(err, next))

const getCourse = (req, res, next) => {
  const { courseId } = req.params
  return prisma.courses
    .findUniqueOrThrow({
      where: {
        id: +courseId,
      },
      include: {
        category: true,
        CourseContent: true,
      },
    })
    .then((course) => res.send(course))
    .catch((err) => handleError(err, next))
}

module.exports = {
  createCourse,
  updateCourse,
  getCourses,
  getCourse,
}
