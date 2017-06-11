'use strict';

import express from 'express';
import asyncify from 'express-wrap-async';
import Promise from 'bluebird';
import config from 'config';
import request from 'request-promise';


// token
const token = config.get('profile.token');


// init router
const router = express.Router();


// /
router.get('/', asyncify(async function (req, res) {
    // request basic
    let profile = await request.get({url: 'http://dev.the-straits-network.com/me/basic', qs: {token}, json: true});

    if (profile && profile.id) {
        // because promise will not throw an error, so try catch and throw it.
        try {
            // request picture and friend in parallel by using Promise.all
            const [picture, friends] = await Promise.all([
                request.get({url: `http://dev.the-straits-network.com/${profile.id}/extra`, qs: {token}, json: true}),
                request.get({url: `http://dev.the-straits-network.com/${profile.id}/friends`, qs: {token}, json: true})
            ]);

            // append picture and friends
            profile.picture = picture;
            profile.friends = friends;
        } catch (error) {
            throw error;
        }
    }

    // response profile
    res.json(profile);
}));


export default router;
