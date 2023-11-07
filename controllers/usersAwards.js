const { prisma } = require('../utils/prisma')
const { handleError } = require('../utils/errors')

const addUserAward = (req, res, next) => {
  const { userId, awardId, createdAt } = req.body
  return prisma.userAwards
    .create({
      data: {
        createdAt,
        award: {
          connect: {
            id: awardId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
    })
    .then((award) => res.status(201).send(award))
    .catch((err) => handleError(err, next))
}

module.exports = {
  addUserAward,
}
