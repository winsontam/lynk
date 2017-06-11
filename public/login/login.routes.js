'use strict';


export default function routes($stateProvider) {
    'ngInject';

    $stateProvider
        .state('login', {
            url: '/',
            component: 'login'
        });
}
