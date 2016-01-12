// public/scripts/userController.js

(function () {

    'use strict';

    angular
        .module('authApp')
        .controller('MenuController', MenuController);

    function MenuController($http, $auth, $rootScope) {

        /*var vm = this;

         vm.users;
         vm.error;

         vm.getUsers = function() {

         //Grab the list of users from the API
         $http.get('api/authenticate').success(function(users) {
         vm.users = users;
         }).error(function(error) {
         vm.error = error;
         });
         }

         // We would normally put the logout method in the same
         // spot as the login method, ideally extracted out into
         // a service. For this simpler example we'll leave it here
         vm.logout = function() {

         $auth.logout().then(function() {

         // Remove the authenticated user from local storage
         localStorage.removeItem('user');

         // Flip authenticated to false so that we no longer
         // show UI elements dependant on the user being logged in
         $rootScope.authenticated = false;

         // Remove the current user info from rootscope
         $rootScope.currentUser = null;
         });
         }*/
    }

    angular
        .module('authApp').directive('fileModel', ['$parse', function ($parse) {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    var model = $parse(attrs.fileModel);
                    var modelSetter = model.assign;

                    element.bind('change', function () {
                        scope.$apply(function () {
                            modelSetter(scope, element[0].files[0]);
                        });
                    });
                }
            };
        }]);

    angular
        .module('authApp').service('fileUpload', ['$http', '$q', function ($http, $q) {
            this.uploadFileToUrl = function (file, uploadUrl) {
                var fd = new FormData();
                var defer = $q.defer();
                fd.append('file', file);
                if(file.type=='image/jpeg'){
                    $http.post(uploadUrl, fd, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    })
                        .success(function (res) {
                            //alert('success');
                            defer.resolve(res);
                        })
                        .error(function (error) {
                            //console.log('');
                            defer.reject('Помилка завантаження зображення!');
                        });
                }else{
                    defer.reject('Файл для завантаження повинен бути зображенням з розширенням jpeg - обов\'язково!');
                }

                return defer.promise;
            }
        }]);

    angular
        .module('authApp').controller('myCtrl', ['$scope','$auth', 'fileUpload','$location', function ($scope,$auth,fileUpload,$location) {
            $scope.post_error = false;
            $scope.image_url=false;
            $scope.start_loading = false;
            $scope.uploadFile = function () {
                $scope.post_error = false;
                $scope.image_url=false;
                $scope.start_loading = false;
                var file = $scope.myFile;
                if(typeof file !== 'undefined'){
                    console.log('file is '+file.type);
                    console.dir(file);
                    var uploadUrl = "api/apply/upload";
                    $scope.start_loading = true;
                    fileUpload.uploadFileToUrl(file, uploadUrl).then(function (res) {
                        //alert(res);
                        $scope.image_url ='http:\\\\'+$location.host()+':8000'+res.url_image;
                        console.log(res);
                        $scope.start_loading = false;
                    }, function (error) {
                        //console.log("ERROR IN CONTROLLER" + error);
                        $scope.post_error = error;
                        $scope.start_loading = false;
                    });
                }else{
                    $scope.post_error = 'Виберіть зображення для завантаження!';
                }

            };
            $scope.navigationUrl = function (url) {

                    window.open(url, '_blank'); // in new tab

            };

            $scope.logout = function() {

                $auth.logout().then(function() {

                    // Remove the authenticated user from local storage
                    localStorage.removeItem('user');

                    // Flip authenticated to false so that we no longer
                    // show UI elements dependant on the user being logged in
                    $rootScope.authenticated = false;

                    // Remove the current user info from rootscope
                    $rootScope.currentUser = null;
                });
            }

        }]);
})();