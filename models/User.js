'use strict';

import {Schema} from 'mongoose';
import bcrypt from 'bcryptjs';


const User = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

User.pre('save', function (next) {
    if (!this.isModified('password') && !this.isNew) {
        return next();
    }

    bcrypt
        .hash(this.password, 10)
        .then((hash) => {
            this.password = hash;
            next();
        })
        .catch((err) => {
            next(err);
        });
});

User.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
};


export default User;
