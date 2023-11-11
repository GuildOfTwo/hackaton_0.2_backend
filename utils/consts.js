const DEFAULT_ERROR_MESSAGES = {
  BAD_REQUEST: 'Invalid data sent',
  UNAUTHORIZED: 'Authorization required',
  FORBIDDEN: 'Access denied',
  NOT_FOUND: 'Service not found',
  CONFLICT: 'User with this email is already registered',
  SERVER_ERROR: 'Internal Server Error',
  ITEM_NOT_FOUND: 'Item with specified id not found',
  BAD_CREDENTIALS: 'Invalid email or password',
  MAX_LIMIT_REACHED:
    'Too many register or login attempts from this IP, please try again after an hour',
}

const VALIDATION_MESSAGES = {
  EMAIL: {
    EMPTY: 'Поле email должно быть заполнено',
    BAD: 'Некорректный адрес почты',
  },
  USER: 'Имя пользователя должно быть заполнено и содержать не менее 2 и не более 30 символов',
}

const USER_MESSAGE = {
  ON_LOGIN: 'Welcome back',
  ON_LOGOUT: 'Successfully signed out',
  APP_RUN: 'App listening on port',
}

module.exports = { DEFAULT_ERROR_MESSAGES, VALIDATION_MESSAGES, USER_MESSAGE }
