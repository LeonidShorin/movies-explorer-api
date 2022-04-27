const { Router } = require('express');
const { celebrate, Joi } = require('celebrate');

const {
  updateUserProfile,
  getCurrentUser,
  createUser,
} = require('../controllers/users');
const { errorMessages } = require('../utils');
const { login, logout } = require('../controllers/login');
const auth = require('../middlewares/auth');

const router = Router();

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required()
      .label('Имя пользователя')
      .messages(errorMessages),
    email: Joi.string().required().email().label('Email')
      .messages(errorMessages),
    password: Joi.string().required().label('Пароль')
      .messages(errorMessages),
  }),
}), createUser);
router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().label('Email').required()
      .messages(errorMessages),
    password: Joi.string().label('Пароль').required()
      .messages(errorMessages),
  }),
}), login);
router.post('/signout', auth, logout);
router.get('/users/me', auth, getCurrentUser);
router.patch('/users/me', auth, celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .label('Имя пользователя')
      .messages(errorMessages),
    email: Joi.string().email().required()
      .label('Email')
      .messages(errorMessages),
  }),
}), updateUserProfile);

module.exports = router;