const userRouter = require('./users');
const movieRouter = require('./movies');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');

const routes = (app) => {
  app.use(userRouter);
  app.use(movieRouter);
  app.use(auth, (req, res, next) => {
    next(new NotFoundError('Маршрут не найден.'));
  });
};

module.exports = routes;