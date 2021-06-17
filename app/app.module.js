angular.module('hrApp' , ['ngRoute'])
.value("sesion",{
    nombre:"Martin",
    mail:"martin@mail.com"
})
.value("DEFAULT_SIZE_PAGE",10)
.value("API","http://localhost:8080")
.config(['$routeProvider',
    function config($routeProvider) {
      $routeProvider.
        when('/home', {
            templateUrl: 'views/home.html',
            controller: 'homeCtrl',
        }).
        when('/employees', {
            templateUrl: 'view/employees/employees.html',
            controller: 'employeesController',
        });
    }
  ])
.controller("homeCtrl", 
  function($scope,sesion) {
      console.log("homeCtrl controller");
      $scope.usuario = sesion.nombre;
  }
)
.factory("EmployeeServiceHttp", ['$q','$http','API',function($q,$http,API){	

  var fxAlta = function(registro){
    var deffered = $q.defer();
    $http.post(API+"/plato/",registro)
      .then(
        function (respuesta) {
          console.log(respuesta);
          console.log(respuesta.data);
                deffered.resolve(respuesta.data);
        },
        function (respuesta) {
                console.error(respuesta.data);
                deffered.reject(respuesta.data);
        }
      );
    return deffered.promise;
  }

  var fxFindById = function(idBuscado){
    var deffered = $q.defer();
    $http.get(API+"/plato/"+idBuscado)
    .then(
      function (respuesta) {
        console.log(respuesta.data);
              deffered.resolve(respuesta.data);
      },
      function (respuesta) {
              console.error(respuesta.data);
              deffered.reject(respuesta.data);
      }
    );
    return deffered.promise;
  }

  var fxFindAll = function(){
    var deffered = $q.defer();
    $http.get(API+"/plato/")
    .then(
      function (respuesta) {
        console.log(respuesta.data);
              deffered.resolve(respuesta.data);
      },
      function (respuesta) {
              console.error(respuesta.data);
              deffered.reject(respuesta.data);
      }
    );
    return deffered.promise;		
  }
  return {
    guardar: fxAlta,
    buscarPorId: fxFindById,
    buscarTodos: fxFindAll
    };
}]) ;
;