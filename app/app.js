var pragmatistsApp = angular.module('pragmatistsApp', ['ui.router']);

pragmatistsApp.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");

    $stateProvider
        .state('list', {
            url: "/",
            templateUrl: "views/list.html",
            controller:"UsersController",
            controllerAs:"vm",
            resolve: {
                users: function(){
                    return [
                        { name: 'Neddard Stark', email: 'ned@stark.got'},
                        { name: 'Arya Stark', email: 'ned@stark.got'},
                        { name: 'Stannis Lannister', email: 'ned@stark.got'}
                    ];
                }
            }
        });
        
});

pragmatistsApp.controller('UsersController', function($scope, users) {
    var vm = this;
    vm.users = users;
});