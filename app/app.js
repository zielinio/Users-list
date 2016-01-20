var pragmatistsApp = angular.module('pragmatistsApp', ['ui.router', 'LocalStorageModule']);

pragmatistsApp.config(function (localStorageServiceProvider) {
  localStorageServiceProvider
    .setPrefix('pragmatistsApp');
});

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
                users: function(usersService){
                    return usersService.getUsers();
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
            parent: 'list',
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


pragmatistsApp.factory("usersService", function($q, localStorageService){
   return {
       getUsers: function(){
        var deferred = $q.defer(),
            initialData = [{ name: 'Neddard Stark', email: 'ned@stark.got'},
                        { name: 'Arya Stark', email: 'ned@stark.got'},
                        { name: 'Stannis Lannister', email: 'ned@stark.got'}];

        var data = localStorageService.get('usersData') ? localStorageService.get('usersData') : initialData;

        deferred.resolve(data);
               
        return deferred.promise;

       }
   };
});



pragmatistsApp.controller('UsersController', function(users, localStorageService) {
    var vm = this;
    vm.users = users;
    vm.removeItem = function(index) {
      vm.users.splice(index, 1);
      localStorageService.set('usersData', vm.users);
    };
});

pragmatistsApp.controller('EditController', function($stateParams, users, $window, localStorageService) {
  var vm = this;
  vm.user = users[$stateParams.index];
  vm.item = angular.copy(vm.user);
  vm.save = function(object) {
    users[$stateParams.index] = object;
    localStorageService.set('usersData', users);
    $window.history.back();
  };
});

pragmatistsApp.controller('AddController', function(users, $window, localStorageService) {
  var vm = this;
  vm.add = function(object) {
    users.push(object);
    localStorageService.set('usersData', users);
    vm.user = {};
    $window.history.back();
  };
});