const Movie = require('../models/movie');

const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const ConflictError = require('../errors/ConflictError');
const BadRequestError = require('../errors/BadRequestError');

const getOwnMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .then((movies) => {
      if (movies.length === 0) {
        return next(new NotFoundError('Отсутствуют сохраненные фильмы.'));
      }
      res.send(movies);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Переданы некорректные данные.'));
      }
      next(err);
    });
};

const createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description, image, trailerLink, nameRU,
    nameEN, thumbnail, movieId,
  } = req.body;
  const owner = req.user._id;
  Movie.findOne({ owner, movieId })
    .then((movie) => {
      if (movie) {
        return next(new ConflictError('Такой фильм уже существует.'));
      }
      return Movie.create({
        country,
        director,
        duration,
        year,
        description,
        image,
        trailerLink,
        nameRU,
        nameEN,
        thumbnail,
        movieId,
        owner,
      });
    })
    .then(() => {
      res.status(201).send({ message: 'Фильм сохранён.' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Переданы некорректные данные.'));
      }
      next(err);
    });
};

const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  const owner = req.user._id;
  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        return next(new NotFoundError('Фильм не найден.'));
      }
      if (!movie.owner.equals(owner)) {
        return next(new ForbiddenError('Нельзя удалить чужой фильм.'));
      }
      return movie.remove()
        .then(() => {
          res.send({ message: 'Фильм удален.' });
        });
    })
    .catch(next);
};

module.exports = {
  getOwnMovies,
  createMovie,
  deleteMovie,
}