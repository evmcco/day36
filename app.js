const express = require('express'),
    es6Renderer = require('express-es6-template-engine'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    logger = require('morgan');

const topicsRouter = require('./routes/topics');
    // usersRouter = require('./routes/users'),
    // dogsRouter = require('./routes/dogs'),
    // planetsRouter = require('./routes/planets'),
    // ceosRouter = require('./routes/ceos');

const app = express();

app.engine('html', es6Renderer);
app.set('views', 'views');
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', topicsRouter);
// app.use('/users', usersRouter);
// app.use('/dogs', dogsRouter);
// app.use('/planets', planetsRouter);
// app.use('/ceos', ceosRouter);

module.exports = app;
