//Models
window.Asset = Backbone.Model.extend({

	defaults: {
		"id": null,
		"src": "",
		"name": "",
		"description": "",
		"latitude": 0,
		"longitude": 0,
	}

	url: function() {
		return thid.id ? '/assets/' + this.id : '/assets';
	}
});

window.AssetCollection = Backbone.Collection.extend({
	model: Asset,
	url: "../api/assets"
});

//Views

window.CurrentAssetsView = Backbone.View.extend({

	initialize: function() {
		this.model.bind("reset", this.render, this);
	},

	render: function(eventName) {
		_.each(this.model.models, function(asset){
			$(this.el).append(new AssetItemView({model: asset}).render().el);
		}, this);
	}
});

window.AssetItemView = Backbone.View.extend({
	template: _.template($('#tpl-asset-item').html()),

	render: function(eventName) {
		$(this.el).html(this.template(this.model.toJSON()));
		return this;
	}
});

// Router

var AppRouter = Backbone.Router.extend({
 
    routes:{
        "":"init",
        "assets/:id":"assetDetails"
    },
 
    list:function () {
        this.assetsList = new AssetCollection();
        this.currentAssetsView = new CurrentAssetsView({model:this.assetsList});
        this.currentAssetsView.fetch();
        $('#current_assets_bar').html(this.currentAssetsView.render().el);
    },
 
    assetDetails:function (id) {
        this.asset = this.assetList.get(id);
        console.log(this.asset);
    }
});
 
var app = new AppRouter();
Backbone.history.start();