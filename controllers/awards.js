const { prisma } = require('../utils/prisma')
const { handleError } = require('../utils/errors')

const createAward = (req, res, next) =>
  prisma.awards
    .create({
      data: req.body,
    })
    .then((award) => res.status(201).send(award))
    .catch((err) => handleError(err, next))
const updateAward = (req, res, next) => {
  const { awardId } = req.params
  return prisma.awards
    .update({
      where: {
        id: +awardId,
      },
      data: req.body,
    })
    .then((award) => res.send(award))
    .catch((err) => handleError(err, next))
}
const getAwards = (req, res, next) =>
  prisma.awards
    .findMany({})
    .then((awards) => res.send(awards))
    .catch((err) => handleError(err, next))
const getAward = (req, res, next) => {
  const { awardId } = req.params
  return prisma.awards
    .findUniqueOrThrow({
      where: {
        id: +awardId,
      },
    })
    .then((award) => res.send(award))
    .catch((err) => handleError(err, next))
}

module.exports = {
  createAward,
  updateAward,
  getAward,
  getAwards,
}
