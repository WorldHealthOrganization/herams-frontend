"use strict";window.appVersion="v1.0",angular.module("app-herams",["ui.router","ui.bootstrap","ngSanitize"]);var CONFIG={esriHTTP:{start:"https://extranet.who.int/maps/rest/services/WHE_BASEMAP/GLOBAL_ADM/MapServer/4/query?where=ADM0_NAME+IN+%28%27",end:"%27%29&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=ADM0_NAME%2C+ISO_2_CODE&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=json"},home:{layersOpacity:.6,dfltColors:{layer_stroke_color:"#7b7b7b",layer_stroke_weight:1.5,layer_fill_color:"#ffffff"},centroidRadius:15},overview:{map:{zoom:5.4,lat:9.082,long:8.6753,basemaps:["https://services.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"],layers:[{name:"Nigeria"}]}},charts:{common:{title:{align:"left"},exporting:{enabled:!1},yAxis:[{labels:{enabled:!1},title:{enabled:!1}}]},bar:{chart:{type:"bar",spacing:[0,0,0,0],marginRight:25,marginLeft:130,marginBottom:50,backgroundColor:"rgba(255, 255, 255, 0.0)",style:{fontFamily:"'Source Sans Pro',sans-serif"}},legend:{enabled:!1},tooltip:{backgroundColor:"rgba(66,66,74,1)",borderWidth:0,shadow:!1,style:{color:"#ffffff"},formatter:function(){return"<b>"+this.point.y+"</b>"},positioner:function(e,t,o){return{x:o.plotX+100,y:o.plotY-3}}},xAxis:{categories:["placeholder 1","placeholder 2","placeholder 3","placeholder 4"],labels:{style:{width:"100px",fontSize:"14px"}}},plotOptions:{bar:{pointWidth:10,align:"left",dataLabels:{enabled:!0,formatter:function(){return"<b>"+this.point.custom+"</b>"},style:{fontSize:"12px",fontWeight:"bold"}}}},series:[{data:[{y:30,custom:342,color:"#dc4a8b"},{y:4,custom:167,color:"#599d22"},{y:20,custom:210,color:"#52addc"},{y:10,custom:62,color:"#006958"}]}]},stacked:{chart:{type:"bar",marginLeft:0,marginRight:0,spacing:[0,0,0,0],backgroundColor:"rgba(255, 255, 255, 0.0)",style:{fontFamily:"'Source Sans Pro',sans-serif"}},tooltip:{backgroundColor:"rgba(66,66,74,1)",borderWidth:0,shadow:!1,style:{color:"#ffffff"},formatter:function(){return"<b>"+this.y+"%</b>"},positioner:function(e,t,o){var a=o.plotX-e-10,r=o.plotY-3;return{x:2<a?a:2,y:2<r?r:2}}},yAxis:[{labels:{enabled:!1},title:{enabled:!1}}],xAxis:{categories:["placeholder 1","placeholder 2","placeholder 3"],labels:{x:0,y:-6,align:"left",style:{width:"200px",fontSize:"12px"}}},plotOptions:{series:{stacking:"normal",pointWidth:6}},series:[{name:"#1 (test)",data:[50,10,5]}]},pie:{chart:{type:"pie",animation:!0,spacing:[0,0,0,0],style:{fontFamily:"'Source Sans Pro',sans-serif"}},exporting:{enabled:!1},credits:{enabled:!1},title:{text:"",align:"left"},legend:{floating:!0,maxHeight:100,verticalAlign:"top",y:100},plotOptions:{pie:{borderColor:"transparent",innerSize:"93%",enableMouseTracking:!0,dataLabels:{enabled:!1},showInLegend:!0}},tooltip:{enabled:!1},series:[{size:"100%",states:{hover:{enabled:!1}}}]},tooltip_pie:{backgroundColor:"rgba(66,66,74,1)",borderWidth:0,shadow:!1,style:{color:"#ffffff"},formatter:function(){var e=Math.pow(10,1),t=Math.round(this.point.percentage*e)/e;return"n = "+this.point.y+"<br/><b>"+t+"%</b>"},positioner:function(e,t,o){return{x:o.plotX+10,y:o.plotY-3}}},legend_cust:{align:"left",enabled:!0,symbolRadius:0,symbolWidth:8,symbolHeight:8,marginLeft:0,spacing:[0,0,0,0]}}};angular.module("app-herams").directive("userpopover",["commonSvc",function(e){return{templateUrl:"/js/common/directives/user_popover.html",restrict:"E",replace:!0,scope:!1}}]),angular.module("app-herams").factory("commonSvc",["$state","$http","$compile","$window","$log",function(e,a,o,t,r){var n={home:ENV_VARS.host+"home",overview:ENV_VARS.host+"categories"};return{deepCopy:function(e){return $.extend(!0,{},e)},loadData:function(e,t){var o={token:tokenConfig};return t&&(o=$.extend(o,t)),a({method:"POST",url:e,params:o})},isLocal:function(){return"localhost"==window.location.hostname},getWSPaths:function(e){return n[e]},home:function(){t.location="/"},gotoProject:function(e){t.location=this.isLocal?"overview.html":"/projects/"+e},showUsrProfile:function(){t.location="/user/settings/profile"},logout:function(){t.location="/site/logout"},setLoginPopover:function(t){t.logout=this.logout,t.viewProfile=this.showUsrProfile,$("#log").popover({container:$(".popover-base"),placement:"bottom",boundary:"window",content:'<span class="popover-spacer">this is a test</span>',html:!0}),$("#log").on("shown.bs.popover",function(){var e=o("<userpopover></userpopover>")(t);$(".popover-body").html(e)})},setUsrInfo:function(e,t){var o=t||{email:"hardtest@novel-t.ch",first_name:"Sam",last_name:"Petragallo"};e.usr_name=o.first_name+" "+o.last_name,e.usr_email=o.email},getWindowWdth:function(){var e=window,t=document,o=t.documentElement,a=t.getElementsByTagName("body")[0];return e.innerWidth||o.clientWidth||a.clientWidth}}}]),angular.module("app-herams").service("esriSvc",["$timeout","$log","$http","LayerPopupSvc",function(e,t,o,f){var h;function a(d,m){var e,t=(e=d.name,CONFIG.esriHTTP.start+e+CONFIG.esriHTTP.end);o({method:"GET",url:t,headers:{"Content-Type":"application/json;charset=UTF-8"}}).then(function(e){var t,o,a,r,n,i,s,l,c,p,u;t=e.data.features,o=d,a=m,r={type:"FeatureCollection"},n=t.map(function(e){return ArcgisToGeojsonUtils.arcgisToGeoJSON(e)}),r.features=n,i=r,s=o,c=(l=a)||CONFIG.home.dfltColors.layer_stroke_color,p=l||CONFIG.home.dfltColors.layer_fill_color,u=L.geoJSON(i,{style:{color:c,weight:CONFIG.home.dfltColors.layer_stroke_weight,fillOpacity:CONFIG.home.layersOpacity,fillColor:p}}).addTo(h),null!=s.stats&&f.addPopup(h,u,s)})}return{getEsriShape:function(e,t,o){h=e,a(t,o)}}}]),angular.module("app-herams").service("LayerPopupSvc",["$timeout","$compile","$log","commonSvc",function(n,i,e,o){return{addPopup:function(a,e,r){if(e.on("mouseover",function(e){if($(".entry-popup.layer"+void 0).length<=0){var t='<entry-popup countryname="'+r.name+'"></entry-popup>',o=L.popup({className:"entry-popup layer"+void 0,closeButton:!0}).setLatLng([r.geodata.lat,r.geodata.long]).setContent(t).openOn(a);n(function(){var e=angular.element(".home").scope();i(o._contentNode)(e)})}}),null!=r.pid){var t=r.pid;e.on("click",function(e){o.gotoProject(t)})}}}}]),angular.module("app-herams").controller("HomeCtrl",["$scope","commonSvc","$log","$http",function(a,r,t,e){var n=!1;a.homedata={},a.statuses=[],a.init=function(){return r.loadData(r.getWSPaths("home")).then(function(e){a.homedata=e.data.results,r.setUsrInfo(a,a.homedata.userinfo),r.setLoginPopover(a);var t=a.homedata.config.statuses;for(var o in t)a.statuses.push(t[o]);$(".collapse-left-content").click(function(){$(".menu-entry").addClass("reduced"),$(".map-entry").addClass("fullscreen"),n=!n,a.$broadcast("collapse-click",{collapsed:n})}),$(".expand-left-content").click(function(){$(".menu-entry").removeClass("reduced"),$(".map-entry").removeClass("fullscreen"),n=!n,a.$broadcast("collapse-click",{collapsed:n})}),$(".loading").hide()}).catch(function(e){t.info("There has been an error Home Data")}).then(function(e){})}}]),angular.module("app-herams").directive("entryPopup",["$log","commonSvc",function(e,r){function s(e){var t,o,a="";for(var r in e)a+=(t=e[r].label,o=e[r].color,-1==t.indexOf("N/A")?"<div><i class='fas fa-circle' style='color:"+o+"'></i>"+t+"</div>":"<div style='text-align:center;width:72px;'>"+t+"</div>");return a}function l(e){var t,o,a=(t=e,(o=r.deepCopy(CONFIG.charts.pie)).chart.margin=[0,0,0,0],o.series[0].data=t,o);return a.chart.backgroundColor="#42424b",a.chart.height=102,a.chart.width=102,a}return{templateUrl:"/js/home/directives/entry-popups.html",restrict:"E",replace:!0,scope:{countryname:"@"},controller:["$scope",function(e){}],link:function(e){var t=function(e,t){for(var o in e)if(e[o].name==t)return e[o]}(e.$parent.homedata.layers,e.countryname);e.data=t.stats;var o,a,r=l(t.stats.charts[0].data),n=l(t.stats.charts[1].data),i=l(t.stats.charts[2].data);a=function(){$("charts-percents:nth-child(1)").css("display","block")},(o=r).plotOptions.pie.events={},o.plotOptions.pie.events.afterAnimate=a(),$("#indic1-chart").highcharts(r),$("#indic2-chart").highcharts(n),$("#indic3-chart").highcharts(i),$("#chart1-legend").html(s(t.stats.charts[0].legend)),$("#chart2-legend").html(s(t.stats.charts[1].legend)),$("#chart3-legend").html(s(t.stats.charts[2].legend)),-1!=t.stats.charts[2].legend[0].label.indexOf("N/A")&&$(".charts-icons>div:nth-child(3)").css("opacity",.3)}}}]),angular.module("app-herams").directive("homemap",["MainMapSvc","$timeout","$log",function(r,e,t){var n;function i(){}return{templateUrl:"/js/home/directives/home-map.html",restrict:"E",replace:!0,scope:{mapdata:"="},controller:["$scope",function(e){}],link:function(a,e,t){a.$watch("mapdata",function(e){if(e.config){n=r.createMainMap("mapid",e.config),a.$on("collapse-click",i),$(window).resize(i);var t=e.config.statuses,o=e.layers;r.addcircleMarkerToMainMap(n,o,t)}})}}}]),angular.module("app-herams").service("MainMapSvc",["$rootScope","$state","$timeout","$window","$compile","$log","commonSvc","esriSvc","LayerPopupSvc",function(e,t,o,a,r,n,i,s,l){return{createMainMap:function(e,t){var o=L.latLng(87.875,-30.535486),a=L.latLng(-71.1879,160.769861),r=L.latLngBounds(o,a),n=L.map(e,{maxBounds:r,minZoom:t.zoom_options.minZoom,maxZoom:t.zoom_options.maxZoom,zoomDelta:t.zoom_options.zoomDelta,center:[40.056073,78.883203],zoom:3});for(var i in n.fitBounds(r),n.zoomControl.setPosition("bottomright"),t.basemaps)L.tileLayer(t.basemaps[i]).addTo(n);return n},addLayersToMainMap:function(e,t,o){for(var a in t){var r=o[t[a].status];s.getEsriShape(e,t[a],r.color)}},addcircleMarkerToMainMap:function(e,t,o){for(var a in t){var r=o[t[a].status],n=L.latLng(t[a].geodata.lat,t[a].geodata.long),i=L.circleMarker(n,{radius:CONFIG.home.centroidRadius,fillColor:r.color,color:t[a].available?"white":r.color,weight:t[a].available?3:0,opacity:1,fillOpacity:CONFIG.home.layersOpacity,className:t[a].stats?"":"disable-cursor"}).addTo(e);t[a].available&&(i.on("mouseover",function(e){e.target.setStyle({radius:CONFIG.home.centroidRadius+3,fillOpacity:1})}),i.on("mouseout",function(e){e.target.setStyle({radius:CONFIG.home.centroidRadius,fillOpacity:CONFIG.home.layersOpacity})})),null!=t[a].stats&&l.addPopup(e,i,t[a])}}}}]);