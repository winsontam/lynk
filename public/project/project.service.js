'use strict';


export default class ProjectService {
    constructor(serverUrl, $http) {
        'ngInject';

        this.serverUrl = serverUrl;
        this.$http = $http;
    }

    newProjects() {
        return this.$http.get(`${this.serverUrl}/project`, {params: {status: 'new'}})
            .then(({data}) => data.projects);
    }

    finishedProjects() {
        return this.$http.get(`${this.serverUrl}/project`, {params: {status: 'finished'}})
            .then(({data}) => data.projects);
    }

    expiredProjects() {
        return this.$http.get(`${this.serverUrl}/project`, {params: {status: 'expired'}})
            .then(({data}) => data.projects);
    }

    project(id) {
        return this.$http.get(`${this.serverUrl}/project/${id}`)
            .then(({data}) => data.project);
    }

    editTitle(id, title) {
        return this.$http
            .post(`${this.serverUrl}/project/${id}`, {title});
    }

    editStatus(id, status) {
        return this.$http
            .post(`${this.serverUrl}/project/${id}`, {status});
    }
}

