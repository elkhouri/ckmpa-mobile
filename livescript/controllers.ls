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

DataController = ($scope, $state, $stateParams, Datasheets, $ionicSlideBoxDelegate, Tallies, $ionicLoading) ->
  $scope.mpa_id = $stateParams.mpaID
  $scope.mpa_name = $stateParams.mpaName
  $scope.transect_name = $stateParams.transectName
  $scope.findTally = (name) -> Tallies.findTally(name)
  $scope.rightButtons =
    content: 'Next'
    type:'button-small button-clear'
    tap: -> $state.go 'summary'
    ...

  datasheets = Datasheets.query {}, ->
    $scope.categories = datasheets |> map (.categories)  |> flatten
    $scope.fields := $scope.categories |> map (.fields) |> flatten
    Tallies.init $scope.fields
    $ionicSlideBoxDelegate.update!
    $scope.loading.hide!

  $scope.loading = $ionicLoading.show do
        content: "<i class='icon ion-loading-c'></i> Loading"
        animation: 'fade-in'
        showBackdrop: true
        maxWidth: 200
        showDelay: 500

SummaryController = ($scope, $state, $stateParams, Datasheets, Tallies) ->
  $scope.mpa_id = $stateParams.mpaID
  $scope.mpa_name = $stateParams.mpaName
  $scope.transect_name = $stateParams.transectNames
  $scope.findTally = (name) -> Tallies.findTally(name)

  $scope.submit = -> $state.go 'finish'

  datasheets = Datasheets.query {}, ->
    $scope.categories = datasheets |> map (.categories)  |> flatten
    $scope.fields := $scope.categories |> map (.fields) |> flatten





