var app, LoginController, MpaController, DataController, SummaryController, FinishController;
app = angular.module('ckmpa.controllers', []);
LoginController = function($scope, $sanitize, $location, Auth, Flash){
  var rightButtons;
  $scope.credentials = {
    username: '',
    password: ''
  };
  rightButtons = [{
    content: 'Logout',
    type: 'button-small button-clear'
  }];
  $scope.rightButtons = rightButtons;
  $scope.login = function(){
    return Auth.login($scope.credentials).success(function(){
      return $location.path('/select-mpa');
    });
  };
  $scope.logout = function(){
    return Auth.logout().success(function(){
      return $location.path('/');
    });
  };
};
MpaController = function($scope, Mpas, $stateParams){
  var mpas;
  $scope.mpa_id = $stateParams.mpaID;
  $scope.mpa_name = $stateParams.mpaName;
  return mpas = Mpas.query({}, function(){
    $scope.transects = flatten(
    map(function(it){
      return it.transects;
    })(
    mpas));
    return $scope.mpas = mpas;
  });
};
DataController = function($scope, $state, $stateParams, $ionicLoading, $ionicModal, Datasheets, Favorites){
  var datasheets;
  $scope.mpa_id = $stateParams.mpaID;
  $scope.mpa_name = $stateParams.mpaName;
  $scope.transect_name = $stateParams.transectName;
  $scope.comments = Datasheets.comments();
  $scope.submit = function(){
    return $state.go('summary');
  };
  $scope.getTally = function(name){
    return Datasheets.getTally(name);
  };
  $scope.getFavorite = function(name){
    return Favorites.get(name);
  };
  $scope.addFavorite = function(name){
    return Favorites.add(name);
  };
  $scope.deleteFavorite = function(name){
    return Favorites['delete'](name);
  };
  $ionicModal.fromTemplateUrl('partials/modal.html', function(modal){
    return $scope.modal = modal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });
  $scope.openModal = function(){
    return $scope.modal.show();
  };
  $scope.closeModal = function(){
    return $scope.modal.hide();
  };
  $scope.$on('$destroy', function(){
    return $scope.modal.remove();
  });
  datasheets = Datasheets.datasheets.then(function(data){
    $scope.categories = Datasheets.categories();
    $scope.favorites = Favorites.favorites();
    return $scope.loading.hide();
  });
  return $scope.loading = $ionicLoading.show({
    content: "<i class='icon ion-loading-c'></i> Loading"
  });
};
SummaryController = function($scope, $state, $stateParams, Datasheets){
  $scope.mpa_id = $stateParams.mpaID;
  $scope.mpa_name = $stateParams.mpaName;
  $scope.transect_name = $stateParams.transectName;
  $scope.getTally = function(name){
    return Datasheets.getTally(name);
  };
  $scope.categories = Datasheets.categories();
  $scope.fields = Datasheets.fields();
  $scope.tallies = Datasheets.tallies();
  $scope.comments = Datasheets.comments();
  return $scope.submit = function(){
    return $state.go('finish');
  };
};
FinishController = function($scope, $state, $stateParams){};