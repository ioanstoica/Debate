var app = angular.module('commentsApp', []);
var apiUrl = 'http://localhost:3000';

app.controller('commentsCtrl', function ($scope, $http) {
    $http({
        method: "GET",
        url: apiUrl
    }).then(function mySuccess(response) {
        $scope.comments = response.data;
    }, function myError(response) {
        console.log(response.statusText);
    });
});

app.controller('postController', function ($scope, $http) {
    $scope.apiUrl = apiUrl;
    $scope.postData = {};
    $scope.postData.id_parinte = "1";

    $scope.submitPost = function () {
        json = JSON.stringify($scope.postData);

        $http.post($scope.apiUrl, json, {
            headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {
            console.log(response.data);
        }, function (error) {
            console.error(error);
        });
    }
});