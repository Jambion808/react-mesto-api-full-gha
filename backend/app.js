const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const routes = require('./routes/index');
const { login, createUser } = require('./controllers/users');
const serverError = require('./errors/server-error');
const auth = require('./middlewares/auth');
const { validCreateUser, validLogin } = require('./middlewares/validation');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');

const { PORT = 3000 } = process.env;

const app = express();
app.use(express.json());
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(requestLogger);
app.use(cors);

app.post('/signin', validLogin, login);
app.post('/signup', validCreateUser, createUser);
app.use(auth);
app.use('/', routes);

app.use(errorLogger);

app.use(errors());
app.use(serverError);

app.listen(PORT, () => console.log('App listening on port {PORT}'));