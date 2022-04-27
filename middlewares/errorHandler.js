const { isCelebrateError } = require('celebrate');

const celebrateErrorHandler = (err, req, res, next) => {
  if (isCelebrateError(err)) {
    const errorBody = err.details.get('body') || err.details.get('params');
    const { details: [errorDetails] } = errorBody;
    res.status(400).send({ message: errorDetails.message });
  } else {
    next(err);
  }
};

const generalErrorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? 'На сервере произошла ошибка.' : err.message;
  res.status(statusCode).send({ message });
  next();
};

module.exports = {
  celebrateErrorHandler,
  generalErrorHandler,
};