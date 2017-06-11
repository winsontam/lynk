'use strict';

import moment from 'moment';
import {User, Project, Expert} from './models';


async function seed() {
    let user = await User.findOne({email: 'lynk@lynk.global'});

    if (!user) {
        user = await User.create({
            email: 'lynk@lynk.global',
            password: 'lynk1234'
        });
    }

    if (!await Project.count()) {
        const expert1 = await Expert.create({
            name: `Jennifer`,
            description: `I am Jennifer.`
        });

        const expert2 = await Expert.create({
            name: `Laura`,
            description: `I am Laura.`
        });

        const expert3 = await Expert.create({
            name: `Olivia`,
            description: `I am Olivia.`
        });


        for (let i = 1; i <= 3; i++) {
            await Project.create({
                title: `New Project ${i}`,
                startAt: moment(),
                expireAt: moment().endOf('day').add(7, 'days'),
                status: 'new',
                user: user._id,
                experts: [
                    {expert: expert1._id, status: 'pending'},
                    {expert: expert2._id, status: 'pending'},
                    {expert: expert3._id, status: 'pending'}
                ]
            });
        }

        for (let i = 3; i <= 6; i++) {
            await Project.create({
                title: `Pending Project ${i}`,
                startAt: moment(),
                expireAt: moment().endOf('day').add(7, 'days'),
                status: 'pending',
                user: user._id,
                experts: [
                    {expert: expert1._id, status: 'pending'},
                    {expert: expert2._id, status: 'pending'},
                    {expert: expert3._id, status: 'pending'}
                ]
            });
        }

        for (let i = 6; i <= 9; i++) {
            await Project.create({
                title: `Expired Project ${i}`,
                startAt: moment().subtract(7, 'days'),
                expireAt: moment().endOf('day').subtract(1, 'days'),
                status: 'pending',
                user: user._id,
                experts: [
                    {expert: expert1._id, status: 'pending'},
                    {expert: expert2._id, status: 'pending'},
                    {expert: expert3._id, status: 'pending'}
                ]
            });
        }
    }
}


seed()
    .then(() => {
        console.log('finished seeding the data');
        process.exit();
    })
    .catch((error) => {
        console.error(error);
        process.exit();
    });
