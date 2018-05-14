'use strict';

/**
 * @ngdoc directive
 * @name app-herams.directive:filters-popover
 * @restrict E
 * @scope
 *   @param
 * @description
 *   Lorem ipsum
 * @example
 *   <dropdown  />
 */
angular.module('app-herams').directive('filtersPopover', function($log,filtersSvc) {

    function getNextPopoverScope (openNext) {
        return angular.element($(openNext).find('.popover-hdr')).scope();
    }

    function openPopover(popoverId,params) {

        $(params.itemClicked).parent().addClass('selected');
        $(popoverId).css("display","block");

        var selectedItem = $(params.itemClicked).attr('data-label');
        var scope = getNextPopoverScope(popoverId);
        scope.updtItems(filtersSvc.getSubLocations(selectedItem));
    }

    return {
        templateUrl: '/js/overview/directives/filters/filters_popovers.html',
        restrict: 'E',
        replace: true,
        scope:{
            title:"@",
            openNext:"@",
            type:"@",
            items: "=",
            grouped:"="
        },
        controller: function ($scope){
            $scope.updtItems = function(data) {
                $scope.items = data;
            }

            $scope.checkItem = function(evt,item_label) {

                if (!filtersSvc.getItemStatus(item_label,$scope.type)){
                    filtersSvc.addFilter(item_label,$scope.type);

                } else {
                    filtersSvc.rmvFilter(item_label,$scope.type);
                }

                evt.stopPropagation();

            }

            $scope.isSelected = function(item_label) {
                var val =  filtersSvc.getItemStatus(item_label,$scope.type);
                return val;
            }

        },
        link: function($scope,elt,attr) {

            if ($scope.grouped) {

                var nextPopoverID = $scope.openNext,
                    lastClicked;

                if (!nextPopoverID)  {
                    $(elt).css("display","none");
                } else {
                    var titleNext = $(nextPopoverID).attr("title");
                }

                $scope.clickFilter = function(evt) {

                    if (evt.currentTarget != lastClicked) $(lastClicked).parent().removeClass('selected');

                    if (!nextPopoverID) {
                        $(elt).css("display","none");
                    } else {
                        if (($(nextPopoverID).css("display") == "block") && (evt.currentTarget == lastClicked)) {
                            $(nextPopoverID).css("display","none");
                            $(evt.currentTarget).parent().removeClass('selected');
                            lastClicked = null;
                        } else {
                            lastClicked = evt.currentTarget;
                            openPopover(nextPopoverID, {
                                itemClicked: evt.currentTarget,
                                title: titleNext
                            });
                        }
                    }

                    evt.stopPropagation();
                }
            }
        }
    }

});
