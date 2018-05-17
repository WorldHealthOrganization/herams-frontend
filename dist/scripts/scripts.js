var CONFIG={esriHTTP:{start:"https://extranet.who.int/maps/rest/services/WHE_BASEMAP/GLOBAL_ADM/MapServer/4/query?where=ADM0_NAME+IN+%28%27",end:"%27%29&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=ADM0_NAME%2C+ISO_2_CODE&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=json"},home:{layersOpacity:.6,dfltColors:{layer_stroke_color:"#7b7b7b",layer_stroke_weight:1.5,layer_fill_color:"#ffffff"},centroidRadius:15},overview:{map:{zoom:5.4,lat:9.082,long:8.6753,basemaps:["https://services.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"],layers:[{name:"Nigeria"}]}},charts:{common:{title:{align:"left"},exporting:{enabled:!1},yAxis:[{labels:{enabled:!1},title:{enabled:!1}}]},bar:{chart:{type:"bar",spacing:[0,0,0,0],marginRight:25,marginLeft:130,marginBottom:50,backgroundColor:"rgba(255, 255, 255, 0.0)",style:{fontFamily:"'Source Sans Pro',sans-serif"}},legend:{enabled:!1},tooltip:{backgroundColor:"rgba(66,66,74,1)",borderWidth:0,shadow:!1,style:{color:"#ffffff"},formatter:function(){return"<b>"+this.point.y+"</b>"},positioner:function(e,t,a){return{x:a.plotX+100,y:a.plotY-3}}},xAxis:{categories:["placeholder 1","placeholder 2","placeholder 3","placeholder 4"],labels:{style:{width:"100px",fontSize:"14px"}}},plotOptions:{bar:{pointWidth:10,align:"left",dataLabels:{enabled:!0,formatter:function(){return"<b>"+this.point.custom+"</b>"},style:{fontSize:"12px",fontWeight:"bold"}}}},series:[{data:[{y:30,custom:342,color:"#dc4a8b"},{y:4,custom:167,color:"#599d22"},{y:20,custom:210,color:"#52addc"},{y:10,custom:62,color:"#006958"}]}]},stacked:{chart:{type:"bar",marginLeft:0,marginRight:0,spacing:[0,0,0,0],backgroundColor:"rgba(255, 255, 255, 0.0)",style:{fontFamily:"'Source Sans Pro',sans-serif"}},tooltip:{backgroundColor:"rgba(66,66,74,1)",borderWidth:0,shadow:!1,style:{color:"#ffffff"},formatter:function(){return"<b>"+this.y+"%</b>"},positioner:function(e,t,a){var o=a.plotX-e-10,r=a.plotY-3;return{x:2<o?o:2,y:2<r?r:2}}},yAxis:[{labels:{enabled:!1},title:{enabled:!1}}],xAxis:{categories:["placeholder 1","placeholder 2","placeholder 3"],labels:{x:0,y:-6,align:"left",style:{width:"200px",fontSize:"12px"}}},plotOptions:{series:{stacking:"normal",pointWidth:6}},series:[{name:"#1 (test)",data:[50,10,5]}]},pie:{chart:{type:"pie",animation:!0,spacing:[0,0,0,0],style:{fontFamily:"'Source Sans Pro',sans-serif"}},exporting:{enabled:!1},credits:{enabled:!1},title:{text:"",align:"left"},legend:{floating:!0,maxHeight:100,verticalAlign:"top",y:100},plotOptions:{pie:{borderColor:"transparent",innerSize:"93%",enableMouseTracking:!0,dataLabels:{enabled:!1},showInLegend:!0}},tooltip:{enabled:!1},series:[{size:"100%",states:{hover:{enabled:!1}}}]},tooltip_pie:{backgroundColor:"rgba(66,66,74,1)",borderWidth:0,shadow:!1,style:{color:"#ffffff"},formatter:function(){var e=Math.pow(10,1),t=Math.round(this.point.percentage*e)/e;return"n = "+this.point.y+"<br/><b>"+t+"%</b>"},positioner:function(e,t,a){return{x:a.plotX+10,y:a.plotY-3}}},legend_cust:{align:"left",enabled:!0,symbolRadius:0,symbolWidth:8,symbolHeight:8,marginLeft:0,spacing:[0,0,0,0]}}};window.appVersion="v1.0",angular.module("app-herams",["ui.router","ui.bootstrap","ngSanitize"]),angular.module("app-herams").factory("commonSvc",["$state","$http","$compile","$window","$log",function(e,o,a,t,r){var n={home:ENV_VARS.host+"home",overview:ENV_VARS.host+"categories"};return{deepCopy:function(e){return $.extend(!0,{},e)},loadData:function(e,t){var a={token:tokenConfig};return t&&(a=$.extend(a,t)),o({method:"POST",url:e,params:a})},isLocal:function(){return"localhost"==window.location.hostname},getWSPaths:function(e){return n[e]},home:function(){t.location="/"},gotoProject:function(e){t.location=this.isLocal?"overview.html":"/projects/"+e},showUsrProfile:function(){t.location="/user/settings/profile"},logout:function(){t.location="/site/logout"},setLoginPopover:function(t){t.logout=this.logout,t.viewProfile=this.showUsrProfile,$("#log").popover({container:$(".popover-base"),placement:"bottom",boundary:"window",content:'<span class="popover-spacer">this is a test</span>',html:!0}),$("#log").on("shown.bs.popover",function(){var e=a("<userpopover></userpopover>")(t);$(".popover-body").html(e)})},setUsrInfo:function(e,t){var a=t||{email:"hardtest@novel-t.ch",first_name:"Sam",last_name:"Petragallo"};e.usr_name=a.first_name+" "+a.last_name,e.usr_email=a.email},getWindowWdth:function(){var e=window,t=document,a=t.documentElement,o=t.getElementsByTagName("body")[0];return e.innerWidth||a.clientWidth||o.clientWidth}}}]),angular.module("app-herams").service("esriSvc",["$timeout","$log","$http","LayerPopupSvc",function(e,t,a,f){var m;function o(p,h){var e,t=(e=p.name,CONFIG.esriHTTP.start+e+CONFIG.esriHTTP.end);a({method:"GET",url:t,headers:{"Content-Type":"application/json;charset=UTF-8"}}).then(function(e){var t,a,o,r,n,i,s,l,c,u,d;t=e.data.features,a=p,o=h,r={type:"FeatureCollection"},n=t.map(function(e){return ArcgisToGeojsonUtils.arcgisToGeoJSON(e)}),r.features=n,i=r,s=a,c=(l=o)||CONFIG.home.dfltColors.layer_stroke_color,u=l||CONFIG.home.dfltColors.layer_fill_color,d=L.geoJSON(i,{style:{color:c,weight:CONFIG.home.dfltColors.layer_stroke_weight,fillOpacity:CONFIG.home.layersOpacity,fillColor:u}}).addTo(m),null!=s.stats&&f.addPopup(m,d,s)})}return{getEsriShape:function(e,t,a){m=e,o(t,a)}}}]),angular.module("app-herams").controller("HomeCtrl",["$scope","commonSvc","$log","$http",function(o,r,t,e){var n=!1;o.homedata={},o.statuses=[],o.init=function(){return r.loadData(r.getWSPaths("home")).then(function(e){o.homedata=e.data.results,r.setUsrInfo(o,o.homedata.userinfo),r.setLoginPopover(o);var t=o.homedata.config.statuses;for(var a in t)o.statuses.push(t[a]);$(".collapse-left-content").click(function(){$(".menu-entry").addClass("reduced"),$(".map-entry").addClass("fullscreen"),n=!n,o.$broadcast("collapse-click",{collapsed:n})}),$(".expand-left-content").click(function(){$(".menu-entry").removeClass("reduced"),$(".map-entry").removeClass("fullscreen"),n=!n,o.$broadcast("collapse-click",{collapsed:n})}),$(".loading").hide()}).catch(function(e){t.info("There has been an error Home Data")}).then(function(e){})}}]),angular.module("app-herams").directive("entryPopup",["$log","commonSvc",function(e,r){function s(e){var t,a,o="";for(var r in e)o+=(t=e[r].label,a=e[r].color,-1==t.indexOf("N/A")?"<div><i class='fas fa-circle' style='color:"+a+"'></i>"+t+"</div>":"<div style='text-align:center;width:72px;'>"+t+"</div>");return o}function l(e){var t,a,o=(t=e,(a=r.deepCopy(CONFIG.charts.pie)).chart.margin=[0,0,0,0],a.series[0].data=t,a);return o.chart.backgroundColor="#42424b",o.chart.height=102,o.chart.width=102,o}return{templateUrl:"/js/home/directives/entry-popups.html",restrict:"E",replace:!0,scope:{countryname:"@"},controller:["$scope",function(e){}],link:function(e){var t=function(e,t){for(var a in e)if(e[a].name==t)return e[a]}(e.$parent.homedata.layers,e.countryname);e.data=t.stats;var a,o,r=l(t.stats.charts[0].data),n=l(t.stats.charts[1].data),i=l(t.stats.charts[2].data);o=function(){$("charts-percents:nth-child(1)").css("display","block")},(a=r).plotOptions.pie.events={},a.plotOptions.pie.events.afterAnimate=o(),$("#indic1-chart").highcharts(r),$("#indic2-chart").highcharts(n),$("#indic3-chart").highcharts(i),$("#chart1-legend").html(s(t.stats.charts[0].legend)),$("#chart2-legend").html(s(t.stats.charts[1].legend)),$("#chart3-legend").html(s(t.stats.charts[2].legend)),-1!=t.stats.charts[2].legend[0].label.indexOf("N/A")&&$(".charts-icons>div:nth-child(3)").css("opacity",.3)}}}]),angular.module("app-herams").directive("homemap",["MainMapSvc","$timeout","$log",function(r,e,t){var n;function i(){}return{templateUrl:"/js/home/directives/home-map.html",restrict:"E",replace:!0,scope:{mapdata:"="},controller:["$scope",function(e){}],link:function(o,e,t){o.$watch("mapdata",function(e){if(e.config){n=r.createMainMap("mapid",e.config),o.$on("collapse-click",i),$(window).resize(i);var t=e.config.statuses,a=e.layers;r.addcircleMarkerToMainMap(n,a,t)}})}}}]),angular.module("app-herams").service("MainMapSvc",["$rootScope","$state","$timeout","$window","$compile","$log","commonSvc","esriSvc","LayerPopupSvc",function(e,t,a,o,r,n,i,s,l){return{createMainMap:function(e,t){var a=L.latLng(87.875,-30.535486),o=L.latLng(-71.1879,160.769861),r=L.latLngBounds(a,o),n=L.map(e,{maxBounds:r,minZoom:t.zoom_options.minZoom,maxZoom:t.zoom_options.maxZoom,zoomDelta:t.zoom_options.zoomDelta,center:[40.056073,78.883203],zoom:3});for(var i in n.fitBounds(r),n.zoomControl.setPosition("bottomright"),t.basemaps)L.tileLayer(t.basemaps[i]).addTo(n);return n},addLayersToMainMap:function(e,t,a){for(var o in t){var r=a[t[o].status];s.getEsriShape(e,t[o],r.color)}},addcircleMarkerToMainMap:function(e,t,a){for(var o in t){var r=a[t[o].status],n=L.latLng(t[o].geodata.lat,t[o].geodata.long),i=L.circleMarker(n,{radius:CONFIG.home.centroidRadius,fillColor:r.color,color:t[o].available?"white":r.color,weight:t[o].available?3:0,opacity:1,fillOpacity:CONFIG.home.layersOpacity,className:t[o].stats?"":"disable-cursor"}).addTo(e);t[o].available&&(i.on("mouseover",function(e){e.target.setStyle({radius:CONFIG.home.centroidRadius+3,fillOpacity:1})}),i.on("mouseout",function(e){e.target.setStyle({radius:CONFIG.home.centroidRadius,fillOpacity:CONFIG.home.layersOpacity})})),null!=t[o].stats&&l.addPopup(e,i,t[o])}}}}]),angular.module("app-herams").controller("MainCtrl",["$scope","$compile","$log","$timeout","commonSvc","filtersSvc","HFMapSvc","chartsSvc",function(r,n,i,s,t,a,l,c){function e(){$(".partners-list-grp").hide(),$(".partners-list").removeClass("fullHeight")}function u(){for(var e=0;e<r.charts.length;e++){$("#chart"+(e+1)).empty()}c.destroyCharts(),c.setCharts(r.charts),l.refreshLayout()}function d(e){return t.loadData(e,a.getHTTPFilters())}function o(a,e){if(null==e&&(e=0),r.catIDSelect[e]!=a.id&&(r.catNameSelect[e]=a.name,r.catIDSelect[e]=a.id,""!=a.ws_chart_url&&""!=a.ws_map_url)){r.mapdata={},r.charts={},r.tables=[],$(".main-content").empty(),c.destroyCharts();var t=function(e){var t;switch(e){case"layout14":t="<layout14></layout14>";break;case"layout13":t="<layout13></layout13>"}return t}(a.layout),o=n(t)(r);$(".main-content").html(o),$(".main-content").hide(),$(".loading").show(),s(function(){var e,t;e=a.ws_chart_url,t=function(){d(a.ws_map_url).then(function(e){r.mapdata=e.data.results,l.createMap("mapid-wkspace",r.mapdata)}).catch(function(e){i.info("Error loading Map Data: ",e)}).then(function(){$(".loading").hide(),$(".main-content").show(),$(window).off("resize",u),$(window).resize(u),s(function(){u()},100)})},d(e).then(function(e){for(var t in r.charts=e.data.stats?e.data.stats:e.data,r.charts)"table"==r.charts[t].type&&r.tables.push(p(r.charts[t]))}).catch(function(e){i.info("Error loading Charts Data: ",e)}).then(function(e){t()})},1500)}r.catMenuON[e]!=a.id?r.catMenuON[e]=a.id:r.catMenuON[e]=""}function p(e){var t={},a=e.rows;for(var o in t.name=e.name,t.cols=e.columns,t.rows=[],a){var r=[];for(var n in a[o])r.push(a[o][n]);t.rows.push(r)}return t}function h(){return t.loadData(t.getWSPaths("overview"),a.applyHTTPFilters(r.date)).then(function(e){r.categories=e.data.results.categories}).catch(function(e){i.info("There has been an error Overview Data")}).then(function(e){o(r.categories[0])})}function f(){r.$broadcast("setFiltersCleared")}r.charts={},r.categories=[],r.catIDSelect=[0,0,0],r.catNameSelect=["","",""],r.catMenuON=["","",""],r.mapdata={},r.tables=[],r.tmpFilters=[],r.date=new Date,r.getAdvancedFiltersCnt=a.getAdvancedFiltersCnt,r.home=function(){t.home()},d(t.getWSPaths("overview")).then(function(e){r.categories=e.data.results.categories,t.setUsrInfo(r,e.data.results.userinfo),t.setLoginPopover(r)}).catch(function(e){i.info("There has been an error Overview Data")}).then(function(e){t.loadData("https://herams-dev.westeurope.cloudapp.azure.com/aping/global-filters").then(function(e){a.setFiltersData(e.data.results),r.states=a.getStatesList(),r.hftypes=a.getHFTypesList()}).catch(function(e){i.info("There has been an error loading Filters")}).then(function(e){t.loadData("https://herams-dev.westeurope.cloudapp.azure.com/aping/filters?pid=374").then(function(e){r.LSQuestions=e.data.groups}).catch(function(e){i.info("There has been an error loading Filters")}).then(function(e){i.info("load filters finally")}),i.info("load filters finally")}),o(r.categories[0])}),r.launchLayout=o,$(".partners-list-btn").click(function(){$(".partners-list-grp").show(),$(".partners-list").addClass("fullHeight"),$(".partners-list-cache").click(function(){$(".partners-list-grp").hide(),$(".partners-list").removeClass("fullHeight")})}),$(window).scroll(e),r.setBreadcrumbs=function(){var e=r.catNameSelect[1];return r.catNameSelect[2]&&(e+=" > "+r.catNameSelect[2]),e},r.applyFilters=h,r.clearSetFilters=f,r.clearMainFilters=function(){0<a.getAdvancedFiltersCnt()&&(a.clearAdvancedFilters(),f(),h())}}]).directive("layout14",function(){return{templateUrl:"/js/overview/directives/layouts/layout_1_4.html",restrict:"E",replace:!0}}).directive("layout13",function(){return{templateUrl:"/js/overview/directives/layouts/layout_1_3.html",restrict:"E",replace:!0}}).directive("datavizTable",function(){return{templateUrl:"/js/overview/directives/dataviz/dataviz-table.html",restrict:"E",replace:!0}}),angular.module("app-herams").directive("hfmap",["$log",function(e){return{templateUrl:"/js/overview/directives/hf-map.html",restrict:"E",replace:!0,scope:!0,link:function(a){a.legend=[],a.$watch("mapdata",function(e){if(e.config)for(var t in e.config.legend)a.legend.push(e.config.legend[t])})}}}]),angular.module("app-herams").service("HFMapSvc",["$rootScope","$state","$timeout","$window","$compile","$log","esriSvc","commonSvc",function(e,t,a,o,r,n,i,s){var l,c,u;return{createMap:function(e,t){for(var a in c=CONFIG.overview.map,(l=L.map(e)).zoomControl.setPosition("topright"),c.basemaps)L.tileLayer(c.basemaps[a]).addTo(l);i.getEsriShape(l,c.layers[0]),function(e,t){var a=t.hf_list,o=t.config.colors,r=[];for(var n in a){var i=L.divIcon({className:"herams-marker-icon",html:'<i class="fas fa-circle" style="color:'+o[a[n].type]+'"></i>'});L.marker(a[n].coord,{icon:i}).addTo(e),r.push(a[n].coord)}var s=r.length<200?r.length:200;u=new L.LatLngBounds(r.slice(0,s)),e.fitBounds(u)}(l,t),this.refreshLayout()},refreshLayout:function(){var e=$(window).height()-280;e=550<e?e:550,$(".main-content").height(e),$(".map-container").height(e);var t=$(".map-container").innerHeight();$("#mapid-wkspace").height(t),l&&l.invalidateSize(),l&&l.fitBounds(u)}}}]);