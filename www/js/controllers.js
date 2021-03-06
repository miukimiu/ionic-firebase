angular.module('starter.controllers', [])

// .controller('DashCtrl', function($scope, Auth) {
//   $scope.login = function(authMethod) {
//     Auth.$authWithOAuthRedirect(authMethod).then(function(authData) {
//       console.log(authData);
//     }).catch(function(error) {
//       if (error.code === 'TRANSPORT_UNAVAILABLE') {
//         Auth.$authWithOAuthPopup(authMethod).then(function(authData) {
//           console.dir(authData);
//         });
//       } else {
//         console.log(error);
//       }
//     });
//   };
//
//   Auth.$onAuth(function(authData) {
//     if (authData === null) {
//       console.log('Not logged in yet');
//     } else {
//       console.log('Logged in as', authData.uid);
//     }
//     $scope.authData = authData; // This will display the user's name in our view
//   });
// })

.controller('DashCtrl', function($scope, Auth, $firebaseAuth, $cordovaOauth) {

  // var fb = new Firebase('https://belapp-76dec.firebaseio.com/');
  //
  // var auth = $firebaseAuth(fb);

    $scope.login = function() {
        $cordovaOauth.facebook("1109688112485231", ["email"]).then(function(result) {
            Auth.$authWithOAuthToken("facebook", result.access_token).then(function(authData) {
                console.log(JSON.stringify(authData));
            }, function(error) {
                console.error("ERROR: " + error);
            });
        }, function(error) {
            console.log("ERROR: " + error);
        });
    }
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
