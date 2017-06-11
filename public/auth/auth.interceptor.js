'use strict';


export default function AuthInterceptor($httpProvider) {
    'ngInject';

    $httpProvider.interceptors.push(function ($q, $cookies, $state) {
        'ngInject';

        return {
            request(config) {
                const user = $cookies.getObject('user');

                if (user && user.token) {
                    config.headers.Authorization = `Bearer ${user.token}`;
                }

                return config;
            },
            responseError(response) {
                if (response && response.status === 401) {
                    $state.go('login');
                }

                return $q.reject(response);
            }
        };
    });
}
