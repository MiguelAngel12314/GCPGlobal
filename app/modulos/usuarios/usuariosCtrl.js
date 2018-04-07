(function() {  

  angular
    .module('app.usuarios')
    .controller('usuariosCtrl', usuariosCtrl);

  usuariosCtrl.$inject = ['$scope','UsuariosService','mapaFactory'];

  function usuariosCtrl($scope,UsuariosService,mapaFactory) {
    /***************************/
    /******** VARIABLES ********/
    /***************************/
    var vm = this;
    var i = 0;


    /***************************/
    /********* Strings *********/
    /***************************/
    vm.message = "";

    /***************************/
    /********* OBJECTS *********/
    /***************************/
    vm.user = {};

    /***************************/
    /********* Arrays **********/
    /***************************/
    vm.datosGrafica = [];

    /***************************/
    /******** FUNCTIONS ********/
    /***************************/
    vm.buscar = buscar;
    vm.obtainProfile = obtainProfile;

    /***************************/
    /****** FUNCTIONALITY ******/
    /***************************/
    function buscar() {     

      vm.datosGrafica = [];
      i = 0;

      var user = vm.user.q.toLowerCase();
      if (user.length >= 4) 
        if (user != "gcpglobal") {
          $("#loader").css("display","flex");
          UsuariosService.users(vm.user).then(success,error);
        }
        else $.notify("GCPGLOBAL no es admiitido","info");
      else $.notify("Debe ser mayor a 4 caracteres","info");

      function success(data) {
        vm.users = data.items;
        if (vm.users.length > 0) armarGrafica(data.items);
        else{ 
          $.notify("No se encontraron resultados","info");
          $("#loader").css("display","none");
        }
      }            
    }


    // FUNCION RECURSIVA QUE SE ENCARGA DE ARMAR LA GRAFICA TRAYENDO LOS SEGUIDORES
    // DE CADA UNO DE LOS USUARIOS.
    function armarGrafica(datos) {
      if (i < 10 && i < datos.length) {
        var profile = datos[i].url;
        UsuariosService.profile(profile).then(successDataChart,error);
        function successDataChart(data) {
          vm.datosGrafica.push([data.login, data.followers]);
          i++;
          armarGrafica(datos);

        }
      }
      else {
        mapaFactory.mapa(vm.datosGrafica);
        console.log(vm.datosGrafica);
        $("#loader").css("display","none");
      }
    }

    // OBTIENE EL PERFIL COMPLETO DEL USUARIO.
    function obtainProfile(profile) {
      $("#loader").css("display","flex");
      UsuariosService.profile(profile).then(successProfile,error);
      function successProfile(data) {
        vm.profile = data;
        $("#modalPerfil").modal("show");
        $("#loader").css("display","none");      }
    }

    function error(data) {
      vm.users = [];
      $.notify(data.message,"error");
      $("#loader").css("display","none");
    }     

  }

})();