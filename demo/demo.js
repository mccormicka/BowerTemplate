define(function (require) {
    'use strict';

    require('angular-mocks');

    var angular = require('angular');

    var module = angular.module('demo', ['PACKAGE_NAME', 'ngMockE2E'])
        .controller('demoCtrl', function ($scope, $window) {
            console.log('Demo Controller instantiated');
        });

    module.run(function ($httpBackend) {
//        Setup fake backend results here.
//        $httpBackend.whenPOST().respond() etc..
    });

    angular.bootstrap(document, ['demo']);

});


