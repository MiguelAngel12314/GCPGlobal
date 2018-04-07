(function() {
  "use strict";

  angular.module('app', [
    //Módulos de ángular
    'ngRoute',

    //------Modulos------
    'app.usuarios',
  ])
  .constant("HOST", "https://api.github.com/")
  .constant("TIMEOUT", 40500);

})();
