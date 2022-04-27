const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    throw new UnauthorizedError('Необходимо авторизоваться.');
  }
  req.user = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key');
  next();
};

module.exports = auth;