/**
 * Created by Slavik on 28.12.15.
 */
// public/scripts/userController.js

(function () {

    'use strict';


    angular
        .module('authApp').controller('StatController', ['$scope','$auth', 'fileUpload', '$http', '$location', function ($scope,$auth, fileUpload, $http, $location) {
            $scope.ctrl_error = false;
            $scope.image_url_input = '';
            var image_name = '',
                filename,
                req = {};
            $scope.array_of_ips = [];
            $scope.send_img_url = function () {
                $scope.ctrl_error = false;
                if ($scope.image_url_input == '') {
                    $scope.ctrl_error = 'Введіть посилання на картинку!';
                } else {

                    image_name = getFilename($scope.image_url_input);
                    req.image_url = image_name;
                    console.log('req' + JSON.stringify(req));
                    $http.post('api/getstat', req)
                        .success(function (res) {
                            console.log(res);
                            $scope.array_of_ips = res.rows;
                            if(res.rows.length!=0){
                                res.rows.forEach(function(item, i, arr) {
                                    console.log('Date'+new Date(item.date));
                                });
                            }else{
                                $scope.ctrl_error = 'Немає іп-адрес по даному посиланню!'
                            }

                        })
                        .error(function (error) {
                            console.log(JSON.stringify(error));
                            $scope.ctrl_error = JSON.stringify(error);
                        });
                }
            };

            function getFilename(url) {
                filename = url.replace(/^.*[\\\/]/, '');
                return 'img' + '\/' + filename;                 //change img to uploads !!!!!!!!!!!!!!!!!!!!!!
            }

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