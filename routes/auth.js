'use strict';

import express from 'express';
import asyncify from 'express-wrap-async';
import {isString, pick} from 'lodash';
import {isEmail, isAlphanumeric, isLength} from 'validator';
import createError from 'http-errors';
import jwt from '../helpers/jwt';
import {User} from '../models';


// validators
const checkEmail = (val) => isString(val) && isEmail(val);
const checkPassword = (val) => isString(val) && isAlphanumeric(val) && isLength(val, {min: 8});


// init router
const router = express.Router();


// /signup
router.post('/signup', asyncify(async function (req, res) {
    // params
    const email = req.body.email;
    const password = req.body.password;

    // validate
    if (!checkEmail(email)) {
        throw new createError.BadRequest('Email is invalid.');
    }

    if (!checkPassword(password)) {
        throw new createError.BadRequest('Password is invalid.');
    }

    if (await User.findOne({email})) {
        throw new createError.BadRequest('Email is already exist.');
    }

    // save user
    const user = await User.create({email, password});

    // response user
    res.json({
        user: pick(user, ['_id', 'email'])
    });
}));


// /login
router.post('/login', asyncify(async function (req, res) {
    // params
    const email = req.body.email;
    const password = req.body.password;

    // validate
    if (!checkEmail(email)) {
        throw new createError.BadRequest('Email is invalid.');
    }

    if (!checkPassword(password)) {
        throw new createError.BadRequest('Password is invalid.');
    }

    // fetch user
    const user = await User.findOne({email});

    // check password
    if (!user || !await user.comparePassword(password)) {
        throw new createError.BadRequest('Email and Password do not match.');
    }

    // generate token
    const token = await jwt.signAsync({userId: user.id});

    // response user with token
    res.json({
        user: {
            ...pick(user, ['_id', 'email']),
            token
        }
    });
}));


// /refresh
router.get('/refresh', asyncify(async function (req, res) {
    // check login
    if (!req.user) {
        throw new createError.Unauthorized('Invalid token.');
    }

    // generate token
    const token = await jwt.signAsync({userId: req.user.id});

    // response user with token
    res.json({
        user: {
            ...pick(req.user, ['_id', 'email']),
            token
        }
    });
}));


export default router;
