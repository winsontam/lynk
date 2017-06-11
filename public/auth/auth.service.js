'use strict';


export default class AuthService {
    constructor(serverUrl, $rootScope, $http, $cookies) {
        'ngInject';

        this.serverUrl = serverUrl;
        this.$rootScope = $rootScope;
        this.$http = $http;
        this.$cookies = $cookies;
    }

    signup(email, password) {
        return this.$http.post(`${this.serverUrl}/auth/signup`, {email, password});
    }

    login(email, password) {
        return this.$http
            .post(`${this.serverUrl}/auth/login`, {email, password})
            .then((response) => {
                if (response && response.data && response.data.user) {
                    this.$rootScope.user = response.data.user;
                    this.$cookies.putObject('user', response.data.user);
                }

                return response;
            });
    }

    logout() {
        this.$rootScope.user = null;
        this.$cookies.remove('user');
    }

    refresh() {
        return this.$http.get(`${this.serverUrl}/auth/refresh`)
            .then((response) => {
                if (response && response.data && response.data.user) {
                    this.$rootScope.user = response.data.user;
                    this.$cookies.putObject('user', response.data.user);
                }

                return response;
            });
    }
}

