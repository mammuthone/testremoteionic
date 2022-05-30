angularApp.controller('servicesCtrl', ['$scope', '$state', '$stateParams', '$ionicHistory', 'HttpManager', 'DataBus', 'DateUtils', 'Toast',
    function ($scope, $state, $stateParams, $ionicHistory, HttpManager, DataBus, DateUtils, Toast) {
    $scope.dateUtils = DateUtils;
    
    var pad = function(num) {
        size = 2;
        var s = num + "";
        while (s.length < size) s = "0" + s;
        return s;
    }

    $scope.servicesTypes = {
        toConfirm: 0,
        confirmed: 1,
        month: 2,
    }

    $scope.servicestype = $stateParams.servicestype;
    $scope.services = [];
    $scope.servicesFiltered = [];
    $scope.requestInProgress = true;
    
    if($scope.servicestype == $scope.servicesTypes.toConfirm) {
        HttpManager.getToConfirmServices()
            .then(function (response) {
                $scope.services = response;

                HttpManager.getToConfirmSeminari()
                    .then(function (seminari) {
                        if(seminari) {
                            seminari.forEach(function(seminario) {
                                $scope.services.push(seminario)
                            });
                        }
                        $scope.servicesFiltered = $scope.services;
                        if(!$scope.$$phase) {
                            $scope.$apply();
                        }
                    })
                    .catch(function (error) {
                        $scope.requestInProgress = false;
                        Toast.showError()
                    })
            })
            .catch(function (error) {
                $scope.requestInProgress = false;
                Toast.showError()
            })
    }
    else if($scope.servicestype == $scope.servicesTypes.confirmed) {
        HttpManager.getConfirmedServices()
            .then(function (response) {
                $scope.services = response;

                HttpManager.getConfirmedSeminari()
                    .then(function (seminari) {
                        if(seminari) {
                            seminari.forEach(function(seminario) {
                                $scope.services.push(seminario)
                            });
                        }

                        $scope.servicesFiltered = $scope.services;
                        if(!$scope.$$phase) {
                            $scope.$apply();
                        }
                })
                .catch(function (error) {
                    $scope.requestInProgress = false;
                    Toast.showError()
                })
            })
            .catch(function (error) {
                $scope.requestInProgress = false;
                Toast.showError()
            })
    }
    else if($scope.servicestype == $scope.servicesTypes.month) {
        var timestamp = $stateParams.year + '-' + pad($stateParams.month);
        
        HttpManager.getWorkedMonth(timestamp)
            .then(function (response) {
                console.log(response)
                $scope.services = (response.confirmed || []).concat(response.closed || []).concat(response.seminari_closed || []).concat(response.seminari_confirmed || []);
                if(!$scope.$$phase) {
                    $scope.$apply();
                }
                initCalendar();
            })
            .catch(function (error) {
                Toast.showError()
            })
    }

    $scope.refuseService = function(id) {
        HttpManager.refuseService(id)
            .then(function (response) {
                $ionicHistory.nextViewOptions({
                    disableBack: true
                });
                $state.go('menu.home')
            })
            .catch(function (error) {
                Toast.showError()
            })
    }

    $scope.goToServiceDetail = function(service, forced, readonly) {
        if((forced || $scope.servicestype != 0)) {
            console.log(service)
            service.readonly = readonly;
            DataBus.setData('service', service);
            if(service.appuntamento) {
                $state.go('menu.serviceDetail', {idservice: service.appuntamento.id})
            } else if(service.seminario) {
                console.log('asdjashdjah')
                $state.go('menu.serviceDetail', {idservice: service.seminario.id})
            }
        }
    }

    $scope.acceptSeminario = function(id) {
        HttpManager.acceptSeminario(id)
            .then(function (response) {
                $ionicHistory.nextViewOptions({
                    disableBack: true
                });
                $state.go('menu.home')
            })
            .catch(function (error) {
                Toast.showError()
            })
    }

    $scope.refuseSeminario = function(id) {
        HttpManager.refuseSeminario(id)
            .then(function (response) {
                $ionicHistory.nextViewOptions({
                    disableBack: true
                });
                $state.go('menu.home')
                })
            .catch(function (error) {
                Toast.showError()
            })
    }

    $scope.calendar = {
        days: ['Lu', 'Ma', 'Me', 'Gi', 'Ve', 'Sa', 'Do'],
        first: [
            {
                'visible': false,
                'value': '00'
            },
            {
                'visible': false,
                'value': '00'
            },
            {
                'visible': false,
                'value': '00'
            },
            {
                'visible': false,
                'value': '00'
            },
            {
                'visible': false,
                'value': '00'
            },
            {
                'visible': false,
                'value': '00'
            },
            {
                'visible': false,
                'value': '00'
            }
        ],
        second: [
            {
                'visible': false,
                'value': '00'
            },
            {
                'visible': false,
                'value': '00'
            },
            {
                'visible': false,
                'value': '00'
            },
            {
                'visible': false,
                'value': '00'
            },
            {
                'visible': false,
                'value': '00'
            },
            {
                'visible': false,
                'value': '00'
            },
            {
                'visible': false,
                'value': '00'
            }
        ],
        third: [
            {
                'visible': false,
                'value': '00'
            },
            {
                'visible': false,
                'value': '00'
            },
            {
                'visible': false,
                'value': '00'
            },
            {
                'visible': false,
                'value': '00'
            },
            {
                'visible': false,
                'value': '00'
            },
            {
                'visible': false,
                'value': '00'
            },
            {
                'visible': false,
                'value': '00'
            }
        ],
        fourth: [
            {
                'visible': false,
                'value': '00'
            },
            {
                'visible': false,
                'value': '00'
            },
            {
                'visible': false,
                'value': '00'
            },
            {
                'visible': false,
                'value': '00'
            },
            {
                'visible': false,
                'value': '00'
            },
            {
                'visible': false,
                'value': '00'
            },
            {
                'visible': false,
                'value': '00'
            }
        ],
        fifth: [
            {
                'visible': false,
                'value': '00'
            },
            {
                'visible': false,
                'value': '00'
            },
            {
                'visible': false,
                'value': '00'
            },
            {
                'visible': false,
                'value': '00'
            },
            {
                'visible': false,
                'value': '00'
            },
            {
                'visible': false,
                'value': '00'
            },
            {
                'visible': false,
                'value': '00'
            }
        ],
        sixth: [
            {
                'visible': false,
                'value': '00'
            },
            {
                'visible': false,
                'value': '00'
            },
            {
                'visible': false,
                'value': '00'
            },
            {
                'visible': false,
                'value': '00'
            },
            {
                'visible': false,
                'value': '00'
            },
            {
                'visible': false,
                'value': '00'
            },
            {
                'visible': false,
                'value': '00'
            }
        ]
    }
    $scope.selectedDate = null;

    var initCalendar = function () {
        var y = $stateParams.year;
        var m = $stateParams.month - 1;
        var firstDay = new Date(y, m, 1).getDate();
        var lastDay = new Date(y, m+1, 0).getDate();

        var rows = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth'];
        var indexRow = 0;
        for (var i = firstDay; i <= lastDay; i++) {
            var today = new Date(y, m, i);
            var todayInWeek = today.getDay();
            var todayFromMon = 0;
            if (todayInWeek == 0) {
                todayFromMon = 6;
            } else {
                todayFromMon = todayInWeek - 1;
            }

            var items = $scope.services.filter(function (item) {
                return item.appuntamento && item.appuntamento.timestamp ? new Date(DateUtils.timestampNormalizer(item.appuntamento.timestamp)).getDate() == today.getDate() : new Date(DateUtils.timestampNormalizer(item.seminario.timestamp)).getDate() == today.getDate()
            })

            var itemsNotDone = items.filter(function (item) {
                if(item.appuntamento) {
                    return item.appuntamento.status == 2;
                } else {
                    return item.seminario.status == 2;
                }
            })

            var itemsDone = items.filter(function (item) {
                if(item.appuntamento) {
                    return item.appuntamento.status != 2;
                } else {
                    return item.seminario.status != 2;
                }
            })

            var row = $scope.calendar[rows[indexRow]];
            row[todayFromMon] = {
                'visible': true,
                'value': DateUtils.pad(today.getDate()),
                'red': itemsNotDone.length > 0,
                'done': itemsDone.length > 0,
                'today': today.getDate(),
                'items': items
            }

            if (todayInWeek == 0) {
                indexRow++;
            }
        }
    }
    
    $scope.loadItems = function (entry) {
        $scope.selectedDate = entry.today;
        $scope.servicesFiltered = entry.items
    }

    $scope.existsElement = function (calendar) {
        var items = calendar.filter(function(item){
            return item.value.trim() != '00'
        })
        return items.length > 0
    }
}]);


