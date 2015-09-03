
var App = new Object();        

var Tile = Backbone.Model.extend({
  defaults: {
    clicked: false
  },

});

var TileList = Backbone.Collection.extend({
    model: Tile
});

var TileView = Backbone.View.extend({
    el: "#grid",
    initialize: function(){
        this.listenTo(this.collection,"add", this.renderItem);          
        this.template = _.template($('#template').html());
    },
    events: {
      "click .all-tiles"   : "toggleClick"
    },
    toggleClick: function(e) {
      var id =  e.currentTarget.attributes[2].value;
      var tile =  this.collection.where({'id':Number(id)})[0];
      tile.set('clicked',!tile.get('clicked'));
    },
    render: function () {
        this.collection.each(function(model){
             var tileTemplate = this.template(model.toJSON());
             this.$el.append(tileTemplate);
        }, this);        
        return this;
    },
    renderItem: function(tile) {
         var tileTemplate = this.template(tile.toJSON());
         this.$el.append(tileTemplate);        
    }
});

$(function(){
  App.tileList = new TileList(startData);
  App.tilesView = new TileView({collection: App.tileList});
  App.tilesView.render();
  App.tileList.add(addData);

});