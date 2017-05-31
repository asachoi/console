
angular.module( 'YourApp', [ 'ngMaterial', 'ngMdIcons', 'as.sortable', 'ui.ace'] )
    .controller("YourController", function ($scope, $http, $filter) {
        $scope.groups = [];
        $scope.dropped = []

        $http.get('data/sample_core_events.json').then(
            function(resp) {
                $scope.coreEvents = resp.data.result

                var obj = $scope.coreEvents

                Object.values(obj).forEach(function(x) {
                    //console.debug(x)
                    console.debug(x.var.variable)

                    $scope.palette.push(
                        {
                            name: x.var.variable
                        }
                    )

                })
            }
        )
        $http.get('data/sample_core_event_groups.json').then(
            function(resp) {
                $scope.coreEventGroups = resp.data.result
                 //console.debug($scope.coreEventGroups)
                obj = $scope.coreEventGroups

                Object.values(obj).forEach(function(x) {
                    console.debug(x)
                    $scope.groups.push(
                        {
                            name: x.var.variable,
                            value: x.var.body//[1].attribute.attrValue
                        }
                    )
                });
            }
        )
        $scope.palette = [];
        var dragging = null;

        $scope.sortableOptions = {
            containment: '#sortable-container',
            allowDuplicates: true,
            longTouch: true,
        };

        $scope.sortableCloneOptions = {
            containment: '#sortable-container',
            clone: true,
            longTouch: true,
        };

        $scope.editEvent = function(obj) {
            var resultObj = $scope.coreEvents

            $scope.editmode=true;
            Object.values(resultObj).forEach(
                function(x) {
                    if(x.var.variable == obj.name) {
                        dataObj = x
                    }
                }
            );
            //filterFilter(tmp, {})
            //console.log(dataObj)
            $scope.selectedObj = dataObj
            $scope.code = null
        }

        $scope.setCode = function(obj) {
            console.debug(obj.attribute.attrValue)//.attrValue)


            $scope.code = obj.attribute
            //obj.attribute
        }

        $scope.productSelected = function(obj) {
           $scope.editmode=false;

           this.self = [];




           console.debug(obj.value[0].attribute.attrValue)

           eval(obj.value[0].attribute.attrValue);

           $scope.self = this.self;

           var events = obj.value[1].attribute.attrValue.match(/\event.*?\.create()/g)

           $scope.dropped = []// events.forEach(


           events.forEach(function(x) {
                $scope.dropped.push(
                    {name: x.replace('.create', '')}
                )
            }
           )
        }

    });

    var CatalogConstants = {
        PRODUCT_TYPE: {
            'UVLIFE':1
        }
    }

