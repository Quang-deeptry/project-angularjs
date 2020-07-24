  var app = angular.module("myApp", ["ngRoute"]);
        app.config(function($routeProvider) {
          $routeProvider
          .when("/", {
            templateUrl : "main.html"
          })
          .when("/introduct", {
            templateUrl : "introduct.html",            
          })
          .when("/feedback", {
            templateUrl : "feedback.html"
          })
          .when("/contact", {
            templateUrl : "contact.html"
          })
          .when("/quiz/:id/:name", {
            templateUrl : "quiz.html",
            controller : "quizCtrl",
          })
        })
