'use strict';

import 'bootstrap/dist/css/bootstrap.min.css';
import angular from 'angular';
import angularCookies from 'angular-cookies';
import angularJwt from 'angular-jwt';
import angularUiRouter from 'angular-ui-router';
import AppModule from './app/app.module';
import AuthModule from './auth/auth.module';
import SignupModule from './signup/signup.module';
import LoginModule from './login/login.module';
import DashboardModule from './dashboard/dashboard.module';
import ProjectModule from './project/project.module';


angular
    .module('app', [
        angularCookies,
        angularJwt,
        angularUiRouter,
        AppModule,
        AuthModule,
        SignupModule,
        LoginModule,
        DashboardModule,
        ProjectModule
    ]);
