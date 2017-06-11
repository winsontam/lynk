'use strict';

import {Schema} from 'mongoose';


const Project = new Schema({
    title: {
        type: String,
        unique: true,
        maxlength: 50,
        required: true
    },
    startAt: {
        type: Date,
        required: true
    },
    expireAt: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['new', 'pending', 'finished'],
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    experts: [{
        expert: {
            type: Schema.Types.ObjectId,
            ref: 'Expert',
            required: true
        },
        status: {
            type: String,
            enum: ['pending', 'approved', 'rejected'],
            required: true
        }
    }]
});


export default Project;
