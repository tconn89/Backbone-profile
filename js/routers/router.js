/*global Backbone */
var app = app || {};

(function () {
	'use strict';

	// Projects Router
	// ----------
	var AppRouter = Backbone.Router.extend({
		routes: {
			'all': 'defaultDisplay',
			'focus':'focusOnClick'
		},


		events: function () {
      $('.tile-one').click(function (e) {
        e.preventDefault();
        app.router.navigate(e.target.pathname, true);
      });
    },

    initialize: function(){
      console.log('initialize app');
      this.events();
      app.AppView;
    },
	
		defaultDisplay: function () {

		},

		focusOnClick: function(){
			$('.tile-one').width($('#grid'));
			this.model.toggle();

		}
	});

	app.AppRouter = new AppRouter();
	Backbone.history.start();
})();