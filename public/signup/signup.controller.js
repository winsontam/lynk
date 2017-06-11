'use strict';


export default class {
    constructor($state, AuthService) {
        'ngInject';

        this.authService = AuthService;
        this.$state = $state;
    }

    signup() {
        this.success = false;
        this.error = null;

        this.authService
            .signup(this.form.email, this.form.password)
            .then((response) => {
                this.form = null;
                this.success = true;
            }, ({data}) => {
                this.error = data && data.error ? data.error : 'Unknown Error';
            });
    }
}
