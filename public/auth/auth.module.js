'use strict';

import angular from 'angular';
import AuthInterceptor from './auth.interceptor';
import AuthService from './auth.service';


export default angular
    .module('AuthModule', [])
    .config(AuthInterceptor)
    .service('AuthService', AuthService)
    .name;
