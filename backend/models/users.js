const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const UnauthError = require('../errors/unauth-error');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
      default: 'Жак-Ив Кусто',
      minlength: 2,
      maxlength: 30,
    },
    about: {
      type: String,
      required: false,
      default: 'Исследователь',
      minlength: 2,
      maxlength: 30,
    },
    avatar: {
      type: String,
      required: false,
      default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      validate: {
        validator: (v) => validator.isURL(v),
        message: 'Введен некорректный URL',
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (v) => validator.isEmail(v),
        message: 'Введен некорректный email',
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  { versionKey: false },
);

userSchema.statics.findUserByCredentials = function check(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthError('Неправельные почта или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthError('Неправельные почта или пароль');
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);