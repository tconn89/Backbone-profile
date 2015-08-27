
var app = app || {};
	// The Application
	// ---------------

	// Our overall **AppView** is the top-level piece of UI
	var AppView = Backbone.View.extend({

		// Bind to skeleton in HTML.
		el: $('#grid'),

		events: {
			'click .tile-one': 'expandOnClick'
		},

		initialize: function () {
			console.log('initializing Appview');
		},

		expandOnClick: function() {
			console.log('expandOnClick running');
			$('.tile-one').width($('#grid'));
			this.model.toggle();
		}


	});

	var appView = new AppView();