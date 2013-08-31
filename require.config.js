'use strict';
var require = {
    baseUrl: '/',
    paths: {
        'PACKAGE_NAME': 'scripts/index',
        angular: 'components/angular/angular',
        'angular-mocks': 'components/angular-mocks/angular-mocks'
    },
    shim:{
        angular: {
            exports: 'angular'
        },
        'angular-mocks':{
            deps:['angular'],
            exports:'angular-mocks'
        }
    }
};