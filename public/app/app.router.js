'use strict';


export default function AppRouter($locationProvider, $urlMatcherFactoryProvider, $urlRouterProvider) {
    'ngInject';

    $locationProvider.html5Mode(true);
    $urlMatcherFactoryProvider.strictMode(false);
    $urlRouterProvider.otherwise('/');
}
