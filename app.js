'use strict';

import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import createError from 'http-errors';
import auth from './middleware/auth';
import errorHandler from './middleware/errorHandler';
import AuthRouter from './routes/auth';
import ProjectRouter from './routes/project';
import ProfileRouter from './routes/profile';


// init app
const app = express();

// logger
app.use(logger('dev'));

// bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// cors
app.use(cors());

// load routes
app.use('/auth', auth(), AuthRouter);
app.use('/project', auth(), ProjectRouter);
app.use('/profile', ProfileRouter);

// catch 404
app.use(function(req, res, next) {
    next(createError.NotFound());
});

// errorHandler
app.use(errorHandler());

// start the server
app.listen(3000);

// notify server running
console.log('server started at http://localhost:3000');


export default app;
