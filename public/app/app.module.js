'use strict';

import angular from 'angular';
import AppNocache from './app.nocache';
import AppRouter from './app.router';
import AppController from './app.controller';
import AppTemplate from './app.template.html';
import './app.styles.less';


export default angular
    .module('AppModule', [])
    .constant('serverUrl', 'http://localhost:3000')
    .config(AppNocache)
    .config(AppRouter)
    .component('app', {
        controller: AppController,
        template: AppTemplate
    })
    .name;
