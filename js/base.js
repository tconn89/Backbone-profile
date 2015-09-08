
var App = new Object();        
App.responsive = function(){
  var $winWidth = $(window).width();
  if($winWidth < 432){
    App.COLUMNS = 1;
  }
  else if($winWidth < 720){
    App.COLUMNS = 2;
  }
  else if($winWidth < 928){
    App.COLUMNS = 3;
  }
  else
    App.COLUMNS = 4;
}

$(window).resize(function(){
  App.responsive();
});
$('nav').children().click(function(e){
  e.preventDefault();
  App.tilesView.filter(e);

});
$(function(){

var Tile = Backbone.Model.extend({
  defaults: function(){
    return {
      clicked: false,
      index: -1, 
      row: 0
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
      this.r = 0;
    },
    setIndex: function(model){
        model.set('index',this.collection.i++);


    },
    setRow: function(model){
      model.set('row', this.collection.r);
      if(model.get('index')%App.COLUMNS ==App.COLUMNS-1)
        this.collection.r++;
      console.log('row: ' + model.get('row') + " index: " + model.get('index'));
    },
    getModels: function(row){
      return this.where({'row':row});
    }
    
});

var TileView = Backbone.View.extend({
    el: "#grid",
    initialize: function(){
      var c = this.collection;
      this.listenTo(c,"add", c.setIndex);      
      this.listenTo(c,"add", c.setRow);      
      this.listenTo(c,"add", this.renderItem);      
      this.listenTo(c,"reset", c.initialize);      
      this.template = _.template($('#template').html());
    },
    events: {
      
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

      if($('.current-demo').is('.all')){
        App.tileList.add(allData);
        App.tileList.add(skillsData);
        App.tileList.add(projectsData);
        App.tileList.add(otherData);
      }
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
  
  // Activate window management
  App.responsive();
  // Generate tiles
  App.tileList = new TileList(allData);
  App.tilesView = new TileView({collection: App.tileList});
  App.tilesView.render();
  App.tileList.add(skillsData);
  App.tileList.add(projectsData);
  App.tileList.add(otherData);


});