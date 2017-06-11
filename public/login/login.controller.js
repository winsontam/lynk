'use strict';


export default class LoginController {
    constructor($state, AuthService) {
        'ngInject';

        this.authService = AuthService;
        this.$state = $state;
    }

    login() {
        this.error = null;

        this.authService
            .login(this.form.email, this.form.password)
            .then((response) => {
                this.form = null;
                this.$state.go('dashboard');
            }, ({data}) => {
                this.error = data && data.error ? data.error : 'Unknown Error';
            });
    }
}

