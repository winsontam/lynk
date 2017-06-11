'use strict';


export default function () {
    return function (err, req, res, next) {
        const statusCode = err.statusCode || 500;
        const error = err.message || 'Unknown Error';

        res.status(statusCode).json({error});
    };
}
