(function (window, angular) {
    'use strict';

    angular.module('MODULENAME', []).
        factory('FACTORY_NAME', ['DEPENDENCY', function (DEPENDENCY) {
            return DEPENDENCY;
        }]);

})(window, window.angular);
