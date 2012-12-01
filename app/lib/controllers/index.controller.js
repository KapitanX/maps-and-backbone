var IndexController = Backbone.Router.extend({
	
	views: {
		"main" : null
	},

	routes: {
		"" : "index",
		"asset/:id" : "asset"
	},

	getCollection: function(key) {
		var coll_key = key + 'Collection';
		if (typeof this.coll_key == 'undefined') {
			this.loadCollection(key);
		}
		return this[coll_key];
	},

	loadCollection: function(key) {
		switch (key) {
			case "asset" :
				this.assetCollection = new Assets([
					{
						id: 1,
						src: "app/img/ikea.jpg", 
			        	title:"Pop art", 
			        	description:"Ces que an bary cualque pour la medite va pase"
		        	},
		        	{
						id: 2,
						src: "app/img/art2con.jpg", 
			        	title:"Splash", 
			        	description:"Ces que an estalli cualque culor chanter sere"
		        	},
					{
						id: 3,
						src: "app/img/harmony.jpg", 
			        	title:"Harmony", 
			        	description:"Ces que an mal gut cualque cun tarare ta"
		        	},
		        	{
						id: 4,
						src: "app/img/takabata_sei_art.jpg", 
			        	title:"Takabata", 
			        	description:"Une esplosiun qui se pa ne fuloque cunde mor"
		        	}
	        	]);
			break;
		}
	},

	index: function() {
		if (this.views.main == null) {
			this.views.main = new IndexView({ collection: this.getCollection("asset") });
		}
		this.views.main.toggle();
	},

	asset: function(id) {
		var asset = this.getCollection('asset').getById(id);
		var view = new BigAssetView({ collection: [asset] });
		this.index();
		view.toggle();
	}
});

tpl.loadTemplates(['asset-item', 'asset-item-big']);
var controller = new IndexController;
Backbone.history.start();