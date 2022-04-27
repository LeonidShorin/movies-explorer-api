const { Router } = require('express');
const { celebrate, Joi } = require('celebrate');

const { errorMessages } = require('../utils');
const auth = require('../middlewares/auth');

const router = Router();

const {
  getOwnMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/movies', auth, getOwnMovies);
router.post('/movies', auth, celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().label('Страна')
      .messages(errorMessages),
    director: Joi.string().required().label('Режиссер')
      .messages(errorMessages),
    duration: Joi.number().required().label('Продолжительность фильма')
      .messages(errorMessages),
    year: Joi.string().required().label('Год производства')
      .messages(errorMessages),
    description: Joi.string().required().label('Описание')
      .messages(errorMessages),
    image: Joi.string().required().uri({ allowRelative: true }).label('Ссылка на изображение.')
      .messages(errorMessages),
    trailerLink: Joi.string().required().uri().label('Ссылка на трейлер')
      .messages(errorMessages),
    thumbnail: Joi.string().required().uri({ allowRelative: true }).label('Ссылка на иконку')
      .messages(errorMessages),
    movieId: Joi.number().integer().required().label('Id фильма')
      .messages(errorMessages),
    nameRU: Joi.string().required().label('Название на русском языке')
      .messages(errorMessages),
    nameEN: Joi.string().required().label('Название на английском языке')
      .messages(errorMessages),
  }),
}), createMovie);
router.delete('/movies/:movieId', auth, celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().required()
      .label('id фильма'),
  }),
}), deleteMovie);

module.exports = router;