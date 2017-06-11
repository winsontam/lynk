'use strict';

import asyncify from 'express-wrap-async';
import jwt from '../helpers/jwt';
import {User} from '../models';


export default function () {
    return asyncify(async function (req, res, next) {
        if (!req.headers || !req.headers.authorization) {
            return next();
        }

        const [bearer, token] = req.headers.authorization.split(/\s+/);

        if (bearer.toLowerCase() !== 'bearer') {
            return next();
        }

        if (!token) {
            return next();
        }

        try {
            const {claims: {userId}} = await jwt.verifyAsync(token);

            if (userId) {
                const user = await User.findOne({_id: userId});

                if (user) {
                    req.user = user;
                }
            }
        } catch (error) {
        }

        next();
    });
}
