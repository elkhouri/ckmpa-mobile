var app, LoginController, MpaController, DataController, SummaryController;
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
DataController = function($scope, $state, $stateParams, Datasheets, $ionicSlideBoxDelegate, Tallies, $ionicLoading){
  var datasheets;
  $scope.mpa_id = $stateParams.mpaID;
  $scope.mpa_name = $stateParams.mpaName;
  $scope.transect_name = $stateParams.transectName;
  $scope.findTally = function(name){
    return Tallies.findTally(name);
  };
  $scope.rightButtons = [{
    content: 'Next',
    type: 'button-small button-clear',
    tap: function(){
      return $state.go('summary');
    }
  }];
  datasheets = Datasheets.query({}, function(){
    $scope.categories = flatten(
    map(function(it){
      return it.categories;
    })(
    datasheets));
    $scope.fields = flatten(
    map(function(it){
      return it.fields;
    })(
    $scope.categories));
    Tallies.init($scope.fields);
    $ionicSlideBoxDelegate.update();
    return $scope.loading.hide();
  });
  return $scope.loading = $ionicLoading.show({
    content: "<i class='icon ion-loading-c'></i> Loading",
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 500
  });
};
SummaryController = function($scope, $state, $stateParams, Datasheets, Tallies){
  var datasheets;
  $scope.mpa_id = $stateParams.mpaID;
  $scope.mpa_name = $stateParams.mpaName;
  $scope.transect_name = $stateParams.transectNames;
  $scope.findTally = function(name){
    return Tallies.findTally(name);
  };
  $scope.submit = function(){
    return $state.go('finish');
  };
  return datasheets = Datasheets.query({}, function(){
    $scope.categories = flatten(
    map(function(it){
      return it.categories;
    })(
    datasheets));
    return $scope.fields = flatten(
    map(function(it){
      return it.fields;
    })(
    $scope.categories));
  });
};