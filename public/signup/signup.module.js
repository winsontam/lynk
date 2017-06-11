'use strict';

import angular from 'angular';
import SignupRoutes from './signup.routes';
import SignupController from './signup.controller';
import SignupTemplate from './signup.template.html';


export default angular
    .module('SignupModule', [])
    .config(SignupRoutes)
    .component('signup', {controller: SignupController, template: SignupTemplate})
    .name;
