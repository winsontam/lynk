'use strict';

import express from 'express';
import asyncify from 'express-wrap-async';
import {pick} from 'lodash';
import moment from 'moment';
import createError from 'http-errors';
import {Project, Expert} from '../models';


// init router
const router = express.Router();


// get /
router.get('/', asyncify(async function (req, res) {
    // check login
    if (!req.user) {
        throw new createError.Unauthorized('Invalid token.');
    }

    // params
    const userId = req.user._id;
    const status = req.query.status;

    // make conditions
    let conditions = {user: userId};

    switch (status) {
        case 'expired':
            conditions.expireAt = {$lte: moment()};
            break;
        case 'new':
        case 'pending':
            conditions.status = status;
            conditions.expireAt = {$gt: moment()};
            break;
        case 'finished':
            conditions.status = status;
            break;
    }

    // fetch projects
    const projects = (await Project.find(conditions))
        .map((project) => {
            if (moment().isSameOrAfter(project.expireAt)) {
                project.status = 'expired';
            }

            return pick(project, ['_id', 'title', 'status']);
        });

    // response projects
    res.json({projects});
}));


// get /:id
router.get('/:projectId', asyncify(async function (req, res) {
    // params
    const userId = req.user && req.user._id ? req.user._id : null;
    const projectId = req.params.projectId;

    // fetch project
    const project = await Project.findOne({_id: projectId})
        .populate({path: 'experts.expert', select: 'name status'});

    // check exist
    if (!project) {
        throw new createError.BadRequest('Project id is not correct.');
    }

    // modify status
    if (moment().isSameOrAfter(project.expireAt)) {
        project.status = 'expired';
    }

    // response project and isOwner
    res.json({
        project: {
            ...pick(project, ['_id', 'title', 'status', 'expert']),
            owner: userId && userId.equals(project.user)
        }
    });
}));


// post /:id
router.post('/:projectId', asyncify(async function (req, res) {
    // params
    const userId = req.user && req.user._id ? req.user._id : null;
    const projectId = req.params.projectId;
    const title = req.body.title;
    const status = req.body.status;

    // validate
    if (!title && !status) {
        throw new createError.BadRequest('Title or Status is invalid.');
    }

    if (status && status !== 'finished') {
        throw new createError.BadRequest('Status is invalid.');
    }

    // fetch project
    const project = await Project.findOne({_id: projectId});

    // modify status
    if (moment().isSameOrAfter(project.expireAt)) {
        project.status = 'expired';
    }

    // check exist
    if (!project) {
        throw new createError.BadRequest('Project id is not correct.');
    }

    // check expired
    if (project.status == 'expired') {
        throw new createError.BadRequest('Project id already expired.');
    }

    // check owner
    if (!userId || !userId.equals(project.user)) {
        throw new createError.BadRequest('Project is not allowed to modify.');
    }

    // update
    if (title) {
        project.title = title;
    }

    if (status) {
        project.status = status;
    }

    await project.save();

    // response project
    res.json({
        project: pick(project, ['title', 'status']),
    });
}));


export default router;
