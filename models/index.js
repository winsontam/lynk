'use strict';

import path from 'path';
import glob from 'glob';
import config from 'config';
import Promise from 'bluebird';
import Mongoose from 'mongoose';


// set bluebird as mongoose promise
Mongoose.Promise = Promise;

// load all models in models folder
const mongoose = Mongoose.connect(config.get('mongodb.uri'));
const models = glob
    .sync('*.js', {cwd: path.resolve(__dirname)})
    .filter((file) => file !== path.basename(__filename))
    .reduce((models, file) => {
        const name = path.basename(file, '.js');
        return {
            [name]: mongoose.model(name, require(`./${file}`).default),
            ...models
        };
    }, {});


module.exports = {...models, mongoose, Mongoose};
