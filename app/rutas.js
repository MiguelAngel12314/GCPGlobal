  (function () {
  

  angular
    .module('app')
    .config(routeConfigurator);

  routeConfigurator.$inject = ['$routeProvider','$provide','$httpProvider'];

  function routeConfigurator($routeProvider,$provide, $httpProvider) {

    $routeProvider.
      when('/', {
        templateUrl: 'app/modulos/usuarios/usuariosView.html',
        controller: 'usuariosCtrl as vm'
      }).
      otherwise({
        redirectTo: '/'
      });
  }
///:search

})();
