'use strict';

import Promise from 'bluebird';
import Jwt from 'jwt-async';
import config from 'config';


const {secret, notBefore, expiresIn} = config.get('jwt');

let nbf, exp;

if (notBefore) {
    nbf = Math.floor(Date.now() / 1000) - notBefore;
}

if (expiresIn) {
    exp = Math.floor(Date.now() / 1000) + expiresIn;
}

const jwt = new Jwt({
    crypto: {
        secret
    },
    claims: {
        iat: true,
        nbf,
        exp
    },
});


export default Promise.promisifyAll(jwt);
