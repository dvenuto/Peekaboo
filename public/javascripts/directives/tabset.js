/**
 * Created by Gkumar on 6/14/16.
 */
    'use strict';

    angular.module('peekaboo')
        // Tabset Directive definiton for tabs in a page.
        .directive('tabset', function () {
            return {
                restrict: 'E',
                replace: true,
                transclude: true,
                controller: function ($scope) {
                    $scope.templateUrl = '';
                    var tabs = $scope.tabs = [];
                    var controller = this;

                    this.selectTab = function (tab) {
                        angular.forEach(tabs, function (tab) {
                            tab.selected = false;
                        });
                        tab.selected = true;
                    };

                    this.setTabTemplate = function (templateUrl) {
                        $scope.templateUrl = templateUrl;
                    }

                    this.addTab = function (tab) {
                        if (tabs.length == 0) {
                            controller.selectTab(tab);
                        }
                        tabs.push(tab);
                    };
                },
                templateUrl: 'partials/tabTemplate'
            };
        })
        .directive('tab', function () {
            return {
                restrict: 'E',
                replace: true,
                require: '^tabset',
                scope: {
                    title: '@',
                    templateUrl: '@'
                },
                link: function (scope, element, attrs, tabsetController) {
                    tabsetController.addTab(scope);

                    scope.select = function () {
                        tabsetController.selectTab(scope);
                    }

                    scope.$watch('selected', function () {
                        if (scope.selected) {
                            tabsetController.setTabTemplate(scope.templateUrl);
                        }
                    });
                },
                templateUrl: 'partials/tab'
            };
        })