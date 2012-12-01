var geo = {

	map : null,

	default_options : {
		containerId: "map",
		center: new google.maps.LatLng(37.7699298, -122.4469157),
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
	},

	map_load_event_buffer: [],
	bound_event_buffer: [],

	initialize:function(options) {
		//Map options
    	options = $.extend(this.default_options, options);

		if (navigator.geolocation) { 
			var that = this;
			
			navigator.geolocation.getCurrentPosition(function(position) {  
	    		var point = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	    		options.center = point;
	    		//if the default map is already loaded ignore this
				if (geo.map == null) {
	    			that._loadMap(options);
	    		}
			}, function(){ this._loadMap(options); });
			

			//if the user has not given response in 3 seconds load default map
			setTimeout(function() {
				if (geo.map == null) {
					that._loadMap(options);
				}
			}, 3000);
		} else {
	    	this._loadMap(options);
		} 
    },

    setMarkers:function(markers, randomic, reAttempt) {
    	//If the map has not loaded yet store the setMarkers call until the map is ready
    	if (this.map == null){
    		if (!reAttempt) {
    			this.bound_event_buffer.push(function() { geo.setMarkers(markers, randomic, 1); });
    		}
    	} else {
    		var i = 0;
	    	var marker = null;
	    	var pin = null;
	    	if (randomic) {
	    		var random_points = this._getRandomPointsNearby(markers.length);
	    	}
	    	var that = this;
			markers.each(function(pin_obj) {
	    		pin = {};
	    		if (randomic) {
	    			pin["position"] = random_points[i];
	    		} else {
	    			pin["position"] = new google.maps.LatLng(pin.latitude, pin.longitude);
	    		}
	    		pin["animation"] = google.maps.Animation.DROP,
				pin["map"] = that.map;
				pin["title"] = pin_obj.get("title");
				pin["icon"] = pin_obj.getSrc("map_icon");
				pin["url"] = pin_obj.mapUrl();
				marker = new google.maps.Marker(pin);
				google.maps.event.addListener(marker, 'click', function() {
			      window.location.href = this.url;
			    });
				i++;
			});

    	}
    },

    _getRandomPointsNearby:function(n){
		var bounds = this.map.getBounds();
		var southWest = bounds.getSouthWest();
		var northEast = bounds.getNorthEast();
		var lngSpan = northEast.lng() - southWest.lng();
		var latSpan = northEast.lat() - southWest.lat();
		var result = [];
		for (var i=0; i<n; i++) {
			result.push(new google.maps.LatLng(southWest.lat() + latSpan * Math.random(),
				southWest.lng() + lngSpan * Math.random()));
		}
		return result;
    },

    _loadMap:function(options) {
    	// Initialize the Google Maps API v3
	    this.map = new google.maps.Map(document.getElementById(options.containerId), options);
	    // Place a marker
	    new google.maps.Marker({
			position: options.center,
			map: this.map
	    });
	    this._emptyMapLoadEventBuffer();
	    this._emptyBoundEventBuffer();
    },

    _emptyMapLoadEventBuffer:function() {
    	for (var i=0; i<this.map_load_event_buffer.length; i++){
    		this.map_load_event_buffer[i]();
    	}
    	this.map_load_event_buffer = [];
    },

    _emptyBoundEventBuffer:function() {
    	currentBoundsListener = google.maps.event.addListener(this.map, 'bounds_changed', function () {
    		for (var i=0; i<geo.bound_event_buffer.length; i++){
	    		geo.bound_event_buffer[i]();
	    	}
	    	geo.bound_event_buffer = [];
		});
    }

};