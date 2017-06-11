'use strict';


export default class ProjectController {
    constructor($stateParams, ProjectService) {
        'ngInject';

        // init inject stuff
        this.$stateParams = $stateParams;
        this.projectService = ProjectService;
    }

    $onInit () {
        // init variables
        this.error = null;
        this.editing = false;
        this.project = null;
        this.title = null;

        // check id exist
        if (this.$stateParams.id) {
            // get project detail
            this.projectService
                .project(this.$stateParams.id)
                .then((project) => {
                    this.project = project;
                    this.title = project.title;
                }, ({data}) => {
                    this.error = data && data.error ? data.error : 'Unknown Error';
                });
        } else {
            // if no id
            this.error = 'Project is not found';
        }
    }

    editTitle() {
        // edit title
        this.projectService
            .editTitle(this.$stateParams.id, this.title)
            .then(({data}) => {
                this.project = {...this.project, ...data.project};
                this.editing = false;
            }, ({data}) => {
                this.error = data && data.error ? data.error : 'Unknown Error';
            });
    }

    markStatusAsFinish() {
        // edit status
        this.projectService
            .editStatus(this.$stateParams.id, 'finished')
            .then(({data}) => {
                this.project = {...this.project, ...data.project};
                this.editing = false;
            }, ({data}) => {
                this.error = data && data.error ? data.error : 'Unknown Error';
            });
    }
}

