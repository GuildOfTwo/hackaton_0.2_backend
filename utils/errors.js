const { DEFAULT_ERROR_MESSAGES } = require('./consts')
const { Prisma } = require('@prisma/client')

class BadRequestError extends Error {
  constructor(message = DEFAULT_ERROR_MESSAGES.BAD_REQUEST) {
    super(message)
    this.statusCode = 400
  }
}

class UnauthorizedError extends Error {
  constructor(message = DEFAULT_ERROR_MESSAGES.UNAUTHORIZED) {
    super(message)
    this.statusCode = 401
  }
}

class ForbiddenError extends Error {
  constructor(message = DEFAULT_ERROR_MESSAGES.FORBIDDEN) {
    super(message)
    this.statusCode = 403
  }
}

class NotFoundError extends Error {
  constructor(message = DEFAULT_ERROR_MESSAGES.NOT_FOUND) {
    super(message)
    this.statusCode = 404
  }
}

class ConflictError extends Error {
  constructor(message = DEFAULT_ERROR_MESSAGES.CONFLICT) {
    super(message)
    this.statusCode = 409
  }
}

class ServerError extends Error {
  constructor(message = DEFAULT_ERROR_MESSAGES.SERVER_ERROR) {
    super(message)
    this.statusCode = 500
  }
}

const handleError = (err, next) => {
  console.log('Error code = ', err?.code)
  if (err instanceof Prisma.PrismaClientValidationError) {
    next(new BadRequestError())
    return
  }
  if (
    err instanceof Prisma.PrismaClientKnownRequestError &&
    err.code === 'P2025'
  ) {
    next(new NotFoundError(DEFAULT_ERROR_MESSAGES.ITEM_NOT_FOUND))
    return
  }
  // if (err.name === 'MongoServerError') {
  //   if (err.code === 11000) {
  //     next(new ConflictError())
  //   } else {
  //     next(new ServerError())
  //   }
  //   return
  // }
  next(err)
}

module.exports = {
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
  ServerError,
  handleError,
}
