'use strict';

import angular from 'angular';
import LoginRoutes from './login.routes';
import LoginController from './login.controller';
import LoginTemplate from './login.template.html';


export default angular
    .module('LoginModule', [])
    .config(LoginRoutes)
    .component('login', {controller: LoginController, template: LoginTemplate})
    .name;
