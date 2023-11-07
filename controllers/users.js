const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { UnauthorizedError } = require('../utils/errors')
const { prisma } = require('../utils/prisma')
const { handleError } = require('../utils/errors')
const { JWT_SECRET } = require('../utils/config')
const { USER_MESSAGE } = require('../utils/consts')
const { DEFAULT_ERROR_MESSAGES } = require('../utils/consts')

const createUser = (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    password,
    accessRoles = ['user'],
    roles = ['all'],
    firstSignIn = true,
    ...rest
  } = req.body
  return bcrypt
    .hash(password, 10)
    .then((hash) =>
      prisma.users.create({
        data: {
          email,
          password: hash,
          accessRoles,
          roles,
          firstName,
          lastName,
          firstSignIn,
          ...rest,
        },
      })
    )
    .then((user) => {
      delete user.password
      res.status(201).send(user)
    })
    .catch((err) => handleError(err, next))
}

const updateUser = async (req, res, next) => {
  const { password, ...updateData } = req.body
  const { userId } = req.params
  if (password) updateData.password = await bcrypt.hash(password, 10)
  return prisma.users
    .update({
      where: {
        id: +userId,
      },
      data: updateData,
    })
    .then((user) => {
      delete user.password
      res.send(user)
    })
    .catch((err) => handleError(err, next))
}

const getAllUsers = (req, res, next) =>
  prisma.users
    .findMany({
      include: {
        UserAwards: {
          include: {
            award: true,
          },
        },
        UserCourses: {
          include: {
            course: true,
          },
        },
      },
    })
    .then((users) => {
      res.send(users.map(({ password, ...user }) => user))
    })
    .catch((err) => handleError(err, next))

const findUser = (req, res, next, userId) =>
  prisma.users
    .findUniqueOrThrow({
      where: {
        id: userId,
      },
      include: {
        UserAwards: {
          include: {
            award: true,
          },
        },
        UserCourses: {
          include: {
            course: true,
          },
        },
      },
    })
    .then((user) => {
      delete user.password
      res.send(user)
    })
    .catch((err) => handleError(err, next))

const getUser = (req, res, next) => {
  const { userId } = req.params
  return findUser(req, res, next, +userId)
}

const getProfile = (req, res, next) => findUser(req, res, next, +req.user.id)

const login = (req, res, next) => {
  const { email, password } = req.body
  return prisma.users
    .findUnique({
      where: {
        email,
      },
    })
    .then((user) => {
      if (!user) {
        return Promise.reject(
          new UnauthorizedError(DEFAULT_ERROR_MESSAGES.BAD_CREDENTIALS)
        )
      }
      return bcrypt.compare(password, user.password).then((isMatch) => {
        if (!isMatch) {
          return Promise.reject(
            new UnauthorizedError(DEFAULT_ERROR_MESSAGES.BAD_CREDENTIALS)
          )
        }
        delete user.password
        return user
      })
    })
    .then((user) => {
      const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '7d' })
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: 'None',
        })
        .send(user)
      // .send({ message: `${USER_MESSAGE.ON_LOGIN}, ${user.lastName}` })
    })
    .catch((err) => handleError(err, next))
}

const logout = (req, res) =>
  res
    .clearCookie('jwt', {
      httpOnly: true,
      sameSite: true,
    })
    .send({ message: USER_MESSAGE.ON_LOGOUT })

module.exports = {
  createUser,
  updateUser,
  getAllUsers,
  getUser,
  getProfile,
  login,
  logout,
}
