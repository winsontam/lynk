'use strict';


export default function routes($stateProvider, $urlRouterProvider) {
    'ngInject';

    $stateProvider
        .state('project', {
            url: '/project/:id',
            component: 'project'
        });

    $urlRouterProvider.otherwise('/');
}
