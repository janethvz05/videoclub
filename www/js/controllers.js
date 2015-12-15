angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,$ionicPopup, $timeout,$cordovaSQLite) {
    
    $scope.showAlert = function() {
     var alertPopup = $ionicPopup.alert({
       title: 'Peliculas',
       template: 'Datos guardados'
     });
    }
    
    $scope.guardar = function(persona){
        
        $cordovaSQLite.execute(db, 'INSERT INTO peliculas (nombre,año,genero,sinopsis,actores) VALUES (?,?,?,?,?)', [persona.nombre,persona.año,persona.genero,persona.sinopsis,persona.actores])
        .then(function(result) {
            $scope.statusMessage = "Registro guardado!";
        }, function(error) {
            $scope.statusMessage = "Error al guardar: " + error.message;
        })
        
        /*
        console.log("Nombre: "+persona.nombre);
        console.log("Apellido: "+persona.apellido);
        console.log("Telefono: "+persona.telefono);
        console.log("Email: "+persona.email);
        */
    }
    
})

.controller('ChatsCtrl', function($scope, Chats,$cordovaSQLite) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  //$scope.chats = [];
  
  /*
  $cordovaSQLite.execute(db, 'SELECT * FROM agenda ORDER BY id DESC')
       .then(
          function(result) {
             if (result.rows.length > 0) {
                      for(var i = 0; i < result.rows.length; i++)
                      { 
                        $scope.chats.push({"nombre":result.rows.item(i).nombre,
                                    "apellido":result.rows.item(i).apellido,
                                    "telefono":result.rows.item(i).telefono,
                                    "email":result.rows.item(i).email});
                      }
                    }
                },
                function(error) {
                    $scope.statusMessage = "Error on loading: " + error.message;
                }
        );
  */

  $scope.getAll = function()
  {
      $scope.chats = Chats.all();
  };
  
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats,$cordovaSQLite) {
  //alert($stateParams.chatId);
  //alert(Chats.get($stateParams.chatId));
  //$scope.chat = Chats.get($stateParams.chatId);
  
  $scope.persona = Chats.get($stateParams.chatId);
  
  $scope.guardar=function(persona){
      
      $cordovaSQLite.execute(db,'UPDATE peliculas set nombre=?,año=?,genero=?,sinopsis=?,actores=? where id =?',[persona.nombre,persona.año,persona.genero,persona.sinopsis,persona.actores,persona.id])
      .then(function(result){
         $scope.statusMessage="Registro guardado!";
      },function(error){
           $scope.statusMessage="Error al guardar:"+ error.message;
      })
      
      console.log("Nombre:" +persona.nombre);
      console.log("ID:" +persona.id);
  }
  
  
  
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});