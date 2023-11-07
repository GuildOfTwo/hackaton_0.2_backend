const { prisma } = require('../utils/prisma')
const { handleError } = require('../utils/errors')

const createCategory = (req, res, next) =>
  prisma.coursesCategory
    .create({
      data: req.body,
    })
    .then((category) => res.status(201).send(category))
    .catch((err) => handleError(err, next))

const updateCategory = (req, res, next) => {
  const { categoryId } = req.params
  return prisma.coursesCategory
    .update({
      where: {
        id: +categoryId,
      },
      data: req.body,
    })
    .then((category) => res.send(category))
    .catch((err) => handleError(err, next))
}
const getCategory = (req, res, next) => {
  const { categoryId } = req.params
  return prisma.coursesCategory
    .findUniqueOrThrow({
      where: {
        id: +categoryId,
      },
      include: {
        Courses: true,
      },
    })
    .then((category) => res.send(category))
    .catch((err) => handleError(err, next))
}
const getAllCategories = (req, res, next) =>
  prisma.coursesCategory
    .findMany({
      include: {
        Courses: true,
      },
    })
    .then((categories) => res.send(categories))
    .catch((err) => handleError(err, next))

module.exports = {
  createCategory,
  updateCategory,
  getCategory,
  getAllCategories,
}
