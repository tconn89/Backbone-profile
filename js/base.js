
var App = new Object();        
$('nav').children().click(function(e){
  e.preventDefault();
  App.tilesView.filter(e);

});
$(function(){

var Tile = Backbone.Model.extend({
  defaults: function(){
    return {
      clicked: false,
      index: 1 
    }
  },
  // no error handling yet on next and prev
  next: function(){
    var index = this.get('index');
    return App.tileList.findWhere({'index':index+1});
  },
  prev: function(){
    var index = this.get('index');
    return App.tileList.findWhere({'index':index-1});
  }

});

var TileList = Backbone.Collection.extend({
    model: Tile,
    initialize: function(){
      this.i = 0;
      this.listenTo(this,"add", this.setIndex);
    },
    setIndex: function(model){
        model.set('index',this.i++);
    }
    
});


var TileView = Backbone.View.extend({
    el: "#grid",
    initialize: function(){
      this.listenTo(this.collection,"add", this.renderItem);      
      this.template = _.template($('#template').html());
    },
    events: {
      "click a.skills" : "filter",
      "click .all-tiles"   : "toggleClick"
    },
    toggleClick: function(e) {
      var id =  e.currentTarget.attributes[2].value;
      var tile =  this.collection.where({'index':Number(id)})[0];
      if(!tile.get('clicked')){
        tile.set('clicked',!tile.get('clicked'));
        animate(e, tile);
      }
      else{
        animate(e, tile);
        tile.set('clicked',!tile.get('clicked'));
      }
    },
    render: function() {
        this.collection.each(function(model){
          this.collection.trigger('add',model);
        }, this);        
        return this;
    },
    renderItem: function(tile) {
         var tileTemplate = this.template(tile.toJSON());
         this.$el.append(tileTemplate);        
    },
    filter: function(e){
      // e.preventDefault();
      $('.current-demo').removeClass('current-demo');
      $(e.target).addClass('current-demo');
      App.tilesView.collection.reset();
      this.clear();
      App.tileList.i = 0;

      this.chooseData();
      init(); //initialize svg animation
    },
    clear:function(){
      this.$el.empty();
    },
    chooseData: function(){

      if($('.current-demo').is('.all'))
        App.tileList.add(allData);
      if($('.current-demo').is('.skills'))
        App.tileList.add(skillsData);
      if($('.current-demo').is('.projects'))
        App.tileList.add(projectsData);
      if($('.current-demo').is('.social'))
        App.tileList.add(socialData);
      if($('.current-demo').is('.other'))
        App.tileList.add(otherData);
    }
});
  
  App.tileList = new TileList(allData);
  App.tilesView = new TileView({collection: App.tileList});
  App.tilesView.render();
  App.tileList.add(skillsData);


});