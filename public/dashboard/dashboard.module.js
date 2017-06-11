'use strict';

import angular from 'angular';
import DashboardRoutes from './dashboard.routes';
import DashboardController from './dashboard.controller';
import DashboardTemplate from './dashboard.template.html';


export default angular
    .module('DashboardModule', [])
    .config(DashboardRoutes)
    .component('dashboard', {
        controller: DashboardController,
        template: DashboardTemplate,
        bindings: {
            user: '<',
            newProjects: '<',
            expiredProjects: '<',
        }
    })
    .name;
