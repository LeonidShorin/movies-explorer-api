/* eslint-disable consistent-return */
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const ConflictError = require('../errors/ConflictError');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');

const createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictError('Данный пользователь уже существует.');
      } else {
        return bcrypt.hash(password, 10);
      }
    })
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then(() => {
      res.status(201).send({
        user: {
          name, email,
        },
      });
    })
    .catch((err) => {
      next(err);
    });
};

const updateUserProfile = (req, res, next) => {
  const {
    name,
    email,
  } = req.body;
  const id = req.user._id;
  User.findByIdAndUpdate(id, {
    name,
    email,
  }, {
    new: true,
  })
    .orFail(() => next(new NotFoundError('Невозможно отобразить информацию о пользователе')))
    .then((user) => {
      res.send({
        message: 'Информация о пользователе обновлена.',
        name: user.name,
        email: user.email,
      });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Переданы некорректные данные.'));
      }
      if (err.code === 11000) {
        return next(new ConflictError('Пользователь с таким email уже существует.'));
      }
      next(err);
    });
};

const getCurrentUser = (req, res, next) => {
  const id = req.user._id;
  User.findById(id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Невозможно отобразить информацию о пользователе');
      }
      res.send(user);
    })
    .catch((err) => {
      next(err);
    });
};
module.exports = { createUser, updateUserProfile, getCurrentUser };
