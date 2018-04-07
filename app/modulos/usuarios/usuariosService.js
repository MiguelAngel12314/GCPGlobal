(function(){

  angular
    .module('app.usuarios')
    .factory('UsuariosService', UsuariosService);

  UsuariosService.$inject = ['$q', '$http', '$timeout', 'HOST'];

  function UsuariosService($q, $http, $timeout, HOST) {
    
    return {
      users : function(params) {
        return httpRequest('GET','search/users',null,params);
      },
       profile: function(profile) {
         return httpRequest('GET',profile);
       }
    };

    function httpRequest(metodo,uri,data,params){
      
      if(!uri.includes("http")) uri = HOST + uri;
      var aplazar = $q.defer();
      var aplazarTimeout = $q.defer();
      var tiempoTerminado = false;
      
      var opcRequest = {
        method : metodo,
        url : uri,
        data: data,
        params:params,
        timeout : aplazarTimeout.promise
      };
      
      var peticionHTTP = $http(opcRequest).then(success,error);

      function success(data){
        aplazar.resolve(data.data);
      }

      function error(data){
        if (tiempoTerminado){
          aplazar.reject({message: 'Transcurrió el tiempo máximo de espera, verifique su conexión a internet'});
        }
        else if (data.data != null){
          if(data.data) aplazar.reject(data.data);
          else aplazar.reject({message: 'Ocurrio un error de conexión, favor de verificar su conexión e intentar nuevamente', resp: data});
        }
        else {
          aplazar.reject({message: 'Favor de habilitar su conexión a internet y pruebe nuevamente', resp: data});
        }
      }

      $timeout(function(){
        tiempoTerminado = true;
        aplazarTimeout.resolve();
      }, 1000);

        return aplazar.promise;    
    }
  }
})();
