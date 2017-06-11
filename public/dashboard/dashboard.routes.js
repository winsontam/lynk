'use strict';


export default function routes($stateProvider) {
    'ngInject';

    $stateProvider
        .state('dashboard', {
            url: '/dashboard',
            component: 'dashboard',
            resolve: {
                user: function (AuthService) {
                    'ngInject';

                    return AuthService.refresh();
                }
            }
        });
}
