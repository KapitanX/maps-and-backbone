var IndexView = Backbone.View.extend({

	el: $('#current_assets_bar'),
	template : _.template($('#tpl-asset-item').html()),
	rendered: false,

	toggle: function() {
		if (!this.rendered) {
			this.render();
		}
	},

	render: function() {
		var assets_list = "";
		var self = this;
		this.collection.each(function(asset) {
			assets_list += self.template({"item": asset});
		});
		$(this.el).html(assets_list);
		geo.setMarkers(this.collection, true);
		this.rendered = true;
		return this;
	}

});

var BigAssetView = Backbone.View.extend({
	el: $('#big_asset'),
	template : _.template($('#tpl-asset-item-big').html()),
	rendered: false,

	toggle: function() {
		if (!this.rendered) {
			this.render();
		} else {
			$(this.el).toggle();
		}
	},

	render: function() {
		$(this.el).html(this.template(this.collection[0].toJSON()));
		this.rendered = true;
		return this;
	}
});