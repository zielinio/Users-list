var pragmatistsApp = angular.module('pragmatistsApp', ['ui.router']);

pragmatistsApp.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/list");

    $stateProvider
        .state('app', {
            abstract: true,
            views: {
                "": {
                    templateUrl: "views/layout.html"
                }
            }
        })
        .state('list', {
            url: "/list",
            parent: 'app',
            templateUrl: "views/list.html",
            controller:"UsersController",
            controllerAs:"vm",
            resolve: {
                users: function() {
                    return [
                        { name: 'Neddard Stark', email: 'ned@stark.got'},
                        { name: 'Arya Stark', email: 'ned@stark.got'},
                        { name: 'Stannis Lannister', email: 'ned@stark.got'}
                    ];
                }
            }
        })
        .state('list.user', {
            url: "/user/:index",
            views: {
                "modal@": {
                    templateUrl: "views/modal-layout.html"
                },
                "@list.user": {
                    templateUrl: "views/edit.html",
                    controller: 'EditController',
                    controllerAs:"vm",
                }
            }
        });
        
});

pragmatistsApp.controller('UsersController', function($scope, users) {
    var vm = this;
    vm.users = users;
});

pragmatistsApp.controller('EditController', function($scope, $stateParams, users) {
  var vm = this;
  vm.user = users[$stateParams.index];
});