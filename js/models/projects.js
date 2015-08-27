// Backbone Model

var app = app || {};

(function () {

	'use strict';

	// Projects Model
	// -------------

	// My basic Projects Model has 'focused' attributes.
	app.Project = Backbone.Model.extend({
		defaults: {
			focused: false
		},

		// Toggle the 'focused' state of this project item
		toggle: function () {
			this.save({
				focused: !this.get('focused')
			});
		}
	});
})();