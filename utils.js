const ERR_NOT_FOUND = 404;
const ERR_BAD_REQUEST = 400;
const ERR_SERVER_ERROR = 500;
const ERR_CONFLICT_ERROR = 409;

const errorMessages = {
  'string.base': '{#label} должно быть строкой.',
  'string.empty': 'Пустое поле {#label}, необходимо ввести {#label}.',
  'any.required': 'Отсутствует {#label}. Необходимо ввести или добавить {#label}.',
  'string.email': 'Поле {#label} не соответствует формату электронной почты.',
  'string.min': '{#label} должно быть строкой минимум из {#limit} символов.',
  'string.max': '{#label} должно быть строкой максимум из {#limit} символов.',
  'number.base': 'Поле {#label} должно быть числом.',
  'string.uri': 'Поле {#label} не соответствует формату ссылки.',
  'string.length': 'Некорректный формат {#label}. Должна быть строка из {#limit} символов.',
  'string.hex': 'Некорректный формат {#label}. Должна быть строка из 24 символов.',
};


module.exports = {
  ERR_NOT_FOUND,
  ERR_BAD_REQUEST,
  ERR_SERVER_ERROR,
  ERR_CONFLICT_ERROR,
  errorMessages,
};