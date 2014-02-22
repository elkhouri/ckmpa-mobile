app = angular.module 'ckmpa.controllers', []

LoginController = ($scope, $sanitize, $location, Auth, Flash) !->
  $scope.credentials =
    username: ''
    password: ''

  rightButtons =
    content: 'Logout'
    type:'button-small button-clear'
    ...

  $scope.rightButtons = rightButtons

  $scope.login = -> Auth.login $scope.credentials .success -> $location.path '/select-mpa'
  $scope.logout = -> Auth.logout!.success -> $location.path '/'

MpaController = ($scope, Mpas, $stateParams) ->
  $scope.mpa_id = $stateParams.mpaID
  $scope.mpa_name = $stateParams.mpaName

  mpas = Mpas.query {}, ->
    $scope.transects = mpas |> map (.transects) |> flatten
    $scope.mpas = mpas

DataController = ($scope, $state, $stateParams, $ionicLoading, Datasheets, Favorites) ->
  $scope.mpa_id = $stateParams.mpaID
  $scope.mpa_name = $stateParams.mpaName
  $scope.transect_name = $stateParams.transectName
  $scope.comments = Datasheets.comments!

  
  $scope.submit = -> $state.go 'summary'
  $scope.getTally = (name) -> Datasheets.getTally(name)

  datasheets = Datasheets.datasheets.then (data) ->
    $scope.categories = Datasheets.categories!
    $scope.favorites = Favorites.favorites!
    $scope.loading.hide!

  $scope.loading = $ionicLoading.show do
    content: "<i class='icon ion-loading-c'></i> Loading"

SummaryController = ($scope, $state, $stateParams, Datasheets) ->
  $scope.mpa_id = $stateParams.mpaID
  $scope.mpa_name = $stateParams.mpaName
  $scope.transect_name = $stateParams.transectName
  $scope.getTally = (name) -> Datasheets.getTally(name)
  $scope.categories = Datasheets.categories!
  $scope.fields = Datasheets.fields!
  $scope.tallies = Datasheets.tallies!
  $scope.comments = Datasheets.comments!

  $scope.submit = -> $state.go 'finish'

FinishController = ($scope, $state, $stateParams) ->
  



