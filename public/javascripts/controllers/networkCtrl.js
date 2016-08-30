/**
 * Created by Gkumar on 4/19/16.
 */

(function () {
    'use strict';

    angular.module('peekaboo')
        //network controller to get details of Cloud,networks
        .controller('networkCtrl', networkCtrl);

    networkCtrl.$inject = ['$log', '$scope', 'apiServices'];
    
    function networkCtrl($log, $scope, apiServices) {

        //get details for network page
        apiServices.getNetworks()
            .then(function (data) {
                $log.debug("display all received data from network", data);           
                $scope.networks = data.assets;
            
            });
    }
})();
