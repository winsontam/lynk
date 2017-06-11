'use strict';

import {Schema} from 'mongoose';


const Expert = new Schema({
    name: {
        type: String,
        maxlength: 20,
        required: true
    },
    description: {
        type: String,
        maxlength: 1000,
        required: true
    }
});


export default Expert;
