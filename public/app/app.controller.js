'use strict';


export default class {
    constructor($state, AuthService) {
        'ngInject';

        this.authService = AuthService;
        this.$state = $state;
    }


    logout() {
        this.authService.logout();
        this.$state.go('login');
    }
}
