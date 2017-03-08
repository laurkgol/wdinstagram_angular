"use strict";


  angular
  .module("wdinstagram", [
    "ui.router",
    "ngResource"
    ])
    .config([
      "$stateProvider",
      RouterFunction
    ])
    .factory("instaFactory", [
      "$resource",
      instaFactoryFunction
    ])
    .controller("instaIndexController", [
      "instaFactory",
      "$stateParams",
      instaIndexControllerFunction
    ])
    .controller( "instaNewController", [
      "instaFactory",
      instaNewControllerFunction
    ])
    .controller("instaShowController", [
      "instaFactory",
      "$stateParams",
      instaShowControllerFunction
    ])
    .controller("instaEditController", [
      "instaFactory",
      "$stateParams",
      instaEditControllerFunction
    ]);

  function RouterFunction($stateProvider){
    $stateProvider
    .state("instaIndex", {
      url: "/instas",
      templateUrl: "js/ng-views/index.html",
      controller: "instaIndexController",
      controllerAs: "vm"
    })
    .state("instaNew", {
      url: "/instas/new",
      templateUrl: "js/ng-views/new.html",
      controller: "instaNewController",
      controllerAs: "vm"
    })
    .state("instaShow", {
      url: "/instas/:id",
      templateUrl: "js/ng-views/show.html",
      controller: "instaShowController",
      controllerAs: "vm"
    })
    .state("instaEdit", {
      url: "/instas/:id/edit",
      templateUrl: "js/ng-views/edit.html",
      controller: "instaEditController",
      controllerAs: "vm"
    })
  };

  function instaFactoryFunction( $resource ) {
    return $resource("http://localhost:3000/entries/:id", {}, {
      update: {method: "PUT"}
    })
  }

  function instaIndexControllerFunction( instaFactory ){
    this.instas = instaFactory.query();
  }

  function instaNewControllerFunction( instaFactory ){
      this.insta = new instaFactory();
      this.create = function(){
        this.insta.$save()
      }
    }

  function instaShowControllerFunction( instaFactory, $stateParams ){
    this.insta = instaFactory.get({id: $stateParams.id});
  }

  function instaEditControllerFunction(instaFactory, $stateParams){
    this.insta = instaFactory.get({id: $stateParams.id});
    this.update = function(){
      this.insta.$update({id: $stateParams.id})
    }
    this.destroy = function(){
      this.insta.$delete({id: $stateParams.id});
    }
}
