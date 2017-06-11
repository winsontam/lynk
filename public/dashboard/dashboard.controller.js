'use strict';


export default class {
    constructor(ProjectService) {
        'ngInject';

        // init inject stuff
        this.projectService = ProjectService;
    }

    $onInit() {
        // init variables
        this.error = null;
        this.newProjects = null;
        this.finishedProjects = null;
        this.expiredProjects = null;

        // get new projects
        this.projectService
            .newProjects()
            .then((projects) => {
                this.newProjects = projects;
            }, ({data}) => {
                this.error = data && data.error ? data.error : 'Unknown Error';
            });

        // get finished projects
        this.projectService
            .finishedProjects()
            .then((projects) => {
                this.finishedProjects = projects;
            }, ({data}) => {
                this.error = data && data.error ? data.error : 'Unknown Error';
            });

        // get expired projects
        this.projectService
            .expiredProjects()
            .then((projects) => {
                this.expiredProjects = projects;
            }, ({data}) => {
                this.error = data && data.error ? data.error : 'Unknown Error';
            });
    }
}
