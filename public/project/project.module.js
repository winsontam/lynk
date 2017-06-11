'use strict';

import angular from 'angular';
import ProjectRoutes from './project.routes';
import ProjectService from './project.service';
import ProjectController from './project.controller';
import ProjectTemplate from './project.template.html';


export default angular
    .module('ProjectModule', [])
    .config(ProjectRoutes)
    .service('ProjectService', ProjectService)
    .component('project', {
        controller: ProjectController,
        template: ProjectTemplate,
        bindings: {
            project: '<',
        }
    })
    .name;
