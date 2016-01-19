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
            controller: "UsersController",
            controllerAs: "vm",
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
                    controllerAs: "vm",
                }
            }
        })        
        .state('list.user.add', {
            url: "/add",
            views: {
                "modal@": {
                    templateUrl: "views/modal-layout.html"
                },
                "@list.user.add": {
                    templateUrl: "views/add.html",
                    controller: 'AddController',
                    controllerAs: "vm",
                }
            }
        });
        
});

pragmatistsApp.controller('UsersController', function(users) {
    var vm = this;
    vm.users = users;
    vm.removeItem = function(index) {
      vm.users.splice(index, 1);
    };
});

pragmatistsApp.controller('EditController', function($stateParams, users) {
  var vm = this;
  vm.user = users[$stateParams.index];
});

pragmatistsApp.controller('AddController', function(users, $window) {
  var vm = this;
  vm.add = function(object) {
    users.push(object);
    vm.user = {};
    $window.history.back();
  };
});