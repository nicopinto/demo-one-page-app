var MagicMaps = new function(){
    var magic = this;
    var map,
        icon = 'http://clients.wpointstudio.com/happyplaces/images/marker.png';
    this.initialize = function(isNotProfile){
        var mapDiv = document.getElementById('map'),
            latLng = new google.maps.LatLng(-34.604495,-58.396883);
        map = new google.maps.Map(mapDiv, {
            center: latLng,
            zoom: 14,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: false
        });
        
        if(!(!!isNotProfile))
        	google.maps.event.addListenerOnce(map, 'tilesloaded', addMarkers);
        else
        	google.maps.event.addListenerOnce(map, 'tilesloaded', addRealMarkers);
    };
    this.showPlace = function(likes,friends){
    	return function(e){
    	magic.resetMarker();
    	var markup = '<div id="tooltip"><h3>Happy Place</h3><p>Direcci&oacute;n 1234, Buenos Aires</p><div><span class="likes">'+likes+'</span><span class="friends">'+friends+'</span></div></div>',
    	pointBounds = new google.maps.LatLngBounds(),
		zoom = 16,
		shiftedPos = new google.maps.LatLng(this.position.lat(), this.position.lng()+(0.00008*zoom));
		pointBounds.extend(this.position);
		magic.customInfo(pointBounds, markup);
		map.setCenter(shiftedPos);
		map.setZoom(zoom);
    	}
    };
    this.customInfo = function (bounds, html) {
	this.prototype = new google.maps.OverlayView();
	this.prototype.bounds_ = bounds;
	this.prototype.html_ = html;
	this.prototype.map_ = map;
	this.prototype.div_ = null;
	this.prototype.setMap(map);
	this.prototype.onAdd = function() {
		var div = document.createElement('DIV');
		div.style.borderStyle = "none";
		div.style.borderWidth = "0px";
		div.style.position = "absolute";
		div.id="storeInfoOpen";
		div.innerHTML =this.html_;
		this.div_ = div;
		var panes = this.getPanes();
		panes.overlayImage.appendChild(div);
	}
	this.prototype.draw = function() {
		var overlayProjection = this.getProjection();
		var sw = overlayProjection.fromLatLngToDivPixel(this.bounds_.getSouthWest());
		var ne = overlayProjection.fromLatLngToDivPixel(this.bounds_.getNorthEast());
		var div = this.div_;
		div.style.left = (sw.x-90) + 'px';
		div.style.top = (ne.y-143) + 'px';
	}
	this.prototype.onRemove = function() {
		this.div_.parentNode.removeChild(this.div_);
		this.div_ = null;
	}
	}
    this.resetMarker = function(){
    	$("#tooltip").remove();
    };
    var addMarkers = function() {
        var bounds = map.getBounds(),
            southWest = bounds.getSouthWest(),
            northEast = bounds.getNorthEast(),
            lngSpan = (northEast.lng() - southWest.lng())*3/4,
            latSpan = northEast.lat() - southWest.lat(),
            image = new google.maps.MarkerImage(icon, false, {x:0,y:0}, {x:18,y:30});
        for (var i = 0; i < 10; i++) {
            var latLng = new google.maps.LatLng(southWest.lat() + latSpan * Math.random(),
                southWest.lng() + lngSpan * Math.random()),
                marker = new google.maps.Marker({
                    position: latLng,
                    map: map,
                    icon: image,
                    shadow: 'http://chart.apis.google.com/chart?chst=d_map_pin_shadow'
                });
                google.maps.event.addListener(marker,'click',magic.showPlace(Math.floor(Math.random()*99),Math.floor(Math.random()*98)));
        }
    };

    var addRealMarkers = function(){
    	log("addRealMarkers!")
       	
    	var nirvanaId = (UrlHelper.params.u) ? UrlHelper.params.u : KO.userSession.nirvanaId,
    		profile = KO.Profiles.findById(nirvanaId),
    		image = new google.maps.MarkerImage(icon, false, {x:0,y:0}, {x:18,y:30});
    	
    	log(profile);
    	for(var i=0, places=profile.places, len=places.length;i<len;i++){
//    		log( places[i].get("placeId")+' lat '+places[i].get("latitude") + ' lng '+places[i].get("longitude") );
    		var latLng = new google.maps.LatLng(places[i].get("latitude"),
                places[i].get("longitude")),
                marker = new google.maps.Marker({
                    position: latLng,
                    map: map,
                    icon: image,
                    shadow: 'http://chart.apis.google.com/chart?chst=d_map_pin_shadow'
                });
    	}
    };
};window.UrlHelper = new function(){
	var urlArr = location.href.split("/"),
		protocol = urlArr[0],
		domain = urlArr[2],
		uri = urlArr[urlArr.length - 1];
	
	function getOneVariable(str){
		var o = new Object();
		if(!!str){
			var arr = str.split("=");
			o[arr[0]] = arr[1];
		}
		return o;
	};
	
	function getAllVariables(arr){
		var o = new Object();
		for(var i=0,len=arr.length;i<len;i++){
			var subArr = arr[i].split("=");
			o[subArr[0]] = subArr[1];
		}
		return o;
	};
		
	var actualPage = (uri.indexOf("?") > -1) ? uri.split("?")[0] : uri.split("/")[uri.split("/").length - 1],
		actualPage = (actualPage!="") ? actualPage : "./";
		queryString = (uri.indexOf("?") > -1) ? uri.split("?")[1] : "",
		variables = (!!queryString && queryString.indexOf("&") > -1) ? getAllVariables(queryString.split("&")) : getOneVariable(queryString);
	
	this.params = {};
	this.base = "";
	this.page = "";
		
	this.initialize = function(){ 
		this.page = actualPage;
		this.params = variables;
		this.base = protocol + "//" + domain;
	};
	
};
UrlHelper.initialize();// usage: log('inside coolFunc', this, arguments);
// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function(){
  log.history = log.history || [];   // store logs to an array for reference
  log.history.push(arguments);
  arguments.callee = arguments.callee.caller;  
  if(this.console) console.log( Array.prototype.slice.call(arguments) );
};
// make it safe to use console.log always
(function(b){function c(){}for(var d="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","),a;a=d.pop();)b[a]=b[a]||c})(window.console=window.console||{});
