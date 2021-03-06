
angular.module( 'YourApp', [ 'ngMaterial', 'ngMdIcons', 'as.sortable', 'ui.ace'] )
    .controller("YourController", function ($scope, $http, $filter) {
        $scope.groups = [];
        $scope.dropped = []
        $scope.selectedIndex = 0
        //$scope.currProduct = null

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
            $scope.selectedIndex = 0;
            $scope.currProduct = '';

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

            if(obj.attribute.attrValue.substring(0,1) == '{') {
                obj.attribute.attrValue = obj.attribute.attrValue.slice(1, obj.attribute.attrValue.length - 2)
            }

            $scope.code = obj.attribute

            //if($scope.code.substr
            //obj.attribute
        }

        $scope.removeEvent = function(obj) {


            $scope.dropped = $scope.dropped.filter(function(item) {
                return item.name != obj.name;
            });
        }

        $scope.productSelected = function(obj) {
           $scope.editmode=false;

           this.self = [];




           console.debug(obj.value[0].attribute.attrValue)

           eval(obj.value[0].attribute.attrValue);

           $scope.self = this.self;
           $scope.selectedIndex = 0;

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

