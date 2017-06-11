'use strict';

import Promise from 'bluebird';
import moment from 'moment';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import {User, Project} from '../models';

chai.should();
chai.use(chaiHttp);


describe('Api Testing', () => {
    let token = null;
    let userId = null;
    let newProjectId = null;
    let expiredProjectId = null;
    let records = [];

    before((done) => {
        User.create({email: 'test1234@test1234.com', password: 'test1234'})
            .then((user) => {
                userId = user._id;
                records.push(user);

                return Promise.all([
                    Project.create({
                        title: `New Project`,
                        startAt: moment(),
                        expireAt: moment().endOf('day').add(7, 'days'),
                        status: 'new',
                        user: user._id
                    }),
                    Project.create({
                        title: `Expired Project`,
                        startAt: moment().subtract(7, 'days'),
                        expireAt: moment().endOf('day').subtract(1, 'days'),
                        status: 'pending',
                        user: user._id
                    })]);
            })
            .then(([newProject, expiredProject]) => {
                newProjectId = newProject._id;
                expiredProjectId = expiredProject._id;
                records.push(newProject);
                records.push(expiredProject);

                done();
            });
    });

    after((done) => {
        Promise.map(records, (record) => {
            return record.remove();
        }).then(() => {
            done();
        });
    });

    it('it should be sign up failed and return 400', (done) => {
        chai.request(app)
            .post('/auth/signup')
            .send({
                email: 'test1234@test1234.com',
                password: 'test1234'
            })
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });

    it('it should be login failed and return 400', (done) => {
        chai.request(app)
            .post('/auth/login')
            .send({
                email: 'test1234@test1234.com',
                password: 'xxxxxxxx'
            })
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });

    it('it should be login success and return user with token', (done) => {
        chai.request(app)
            .post('/auth/login')
            .send({
                email: 'test1234@test1234.com',
                password: 'test1234'
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('user');
                res.body.user.should.have.property('token');
                token = res.body.user.token;
                done();
            });
    });

    it('it should be able to get the user', (done) => {
        chai.request(app)
            .get('/auth/refresh')
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('user');
                res.body.user.should.have.property('token');
                token = res.body.user.token;
                done();
            });
    });

    it('it should be able to get the user projects', (done) => {
        chai.request(app)
            .get('/project')
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('projects');
                done();
            });
    });

    it('it should be able to get the user new project', (done) => {
        chai.request(app)
            .get(`/project/${newProjectId}`)
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('project');
                res.body.project.owner.should.equal(true);
                done();
            });
    });

    it('it should be able to get the user expired project', (done) => {
        chai.request(app)
            .get(`/project/${expiredProjectId}`)
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('project');
                res.body.project.owner.should.equal(true);
                done();
            });
    });
});
