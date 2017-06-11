'use strict';


export default function routes($stateProvider) {
    'ngInject';

    $stateProvider
        .state('signup', {
            url: '/signup',
            component: 'signup'
        });
}
