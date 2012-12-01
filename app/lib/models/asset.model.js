	//Backend url
	var apiUrl = 'http://localhost/ejemplo/';

	//Models
	var Asset = Backbone.Model.extend({

		defaults: {
			"id": null,
			"type": "image",
			"src": "",
			"name": "",
			"description": "",
			"latitude": null,
			"longitude": null,
		},

		initialize: function() {
			//Each asset has a collection of assets associated
			this.relatedAssets = new Assets;
			this.relatedAssets.url = apiUrl + this.id + '/related';
		},

		getSrc: function(size) {
			if (!size) size = 'normal';
			var path = this.get("src");
			if (this.get("type") == 'image' && size != 'normal' && filename != "") {
				var parts = this.get("src").split("/");
				var filename = parts[parts.length-1];
				path  = path.replace(filename, size) + "/" + filename;
			}
			return path;
		},

		mapUrl: function() {
			return "#asset/" + this.id;
		},

		url: function() {
			var u = this.id ? apiUrl + 'assets/' + this.id : apiUrl + 'assets/new';
			return u;
		}
	});

	//Collection
	var Assets = Backbone.Collection.extend({
		
		model: Asset,
		
		url: apiUrl + 'assets',

		getById: function(id) {
			for(var i=0; i<this.models.length; i++) {
				var a = this.models[i];
				if (a.get('id') == id) {
					return a;
				}
			}
		}

	});