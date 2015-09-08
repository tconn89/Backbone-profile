var dt = 1000; //1000 millisecond delay
$('all-tiles').css('max-height','330px');
$('all-tiles').css('overflow','hidden');
var defaultWidth; 
function tileFade() {
  $('.all-tiles:not(.clicked)').animate({'opacity':'0'},dt/2,
   	function(){$(this).animate({'opacity':'1'},dt/2)}
  );
}
function slideOpen($tile, tile) {
  defaultWidth = $('.all-tiles').width();
	console.log('open');
  $tile.addClass('clicked');
  $tile.find('img').animate({width: '30%'},dt);
  $tile.find('p.preclick').css('display','none');
  $tile.find('p.tclick').css('display','block');
  $tile.css('max-width','1000');

  offOthers(tile);
  $tile.animate({width:$('#grid').width(),}, dt);

  $tile.find('svg').toggle();
  $tile.css('margin-bottom','20px');
  $tile.css('opacity','1');
  $tile.find('h2').addClass('sl-title');
  $tile.find('p.tclick').animate({'opacity':'1'},2*dt);
  $tile.find('img').css('opacity','1');
}
function slideClosed($tile, tile) {
	console.log('closed');

  $tile.find('p.preclick').css('display','block');
  $tile.find('p.tclick').css('display','none');

  $tile.find('img').animate({width: '100%'},{
    duration: dt,
    complete: function(){
      onOthers(tile);
    }
  });
  $tile.animate({width:defaultWidth}, dt);

  $tile.removeClass('clicked');
  $tile.find('svg').toggle();
  $tile.css('margin-bottom','-30px');
  $('.tclick').css('opacity','0');
  $tile.find('h2').removeClass('sl-title');
  $tile.find('img').css('opacity','0.7');
}
function noAnimateClosed($tile,tile){

  $tile.find('p.preclick').css('display','block');
  $tile.find('p.tclick').css('display','none');

  $tile.find('img').css('width','100%');
  $tile.css('width', defaultWidth);
  onOthers(tile);
  $tile.removeClass('clicked');
  $tile.find('svg').toggle();
  $tile.css('margin-bottom','-30px');
  $('.tclick').css('opacity','0');
  $tile.find('h2').removeClass('sl-title');
  $tile.find('img').css('opacity','0.7');
}
function animate(e, tile){
  e.preventDefault();
  // Nothing Open
  if($('.clicked').length == 0){

    // Absurdly complicated re-ordering
    var tileIndex = e.currentTarget.attributes[2].value; //data-id attribute
    if(tileIndex%App.COLUMNS != 0){
      var row = Math.floor(tileIndex/4);
      var first = $('.grid').children().eq(4*row);
      $(e.currentTarget).insertBefore(first);
    }
    slideOpen($(e.currentTarget),tile);
  }
  else{
    // Something is open
    if($(e.currentTarget)[0] == $('.clicked')[0]){
      // User clicked on same tile
      slideClosed($('.clicked'), tile);
      // $(this).insertAfter($('.grid').children().eq(tileIndex));
    }
    else{
      // User clicked elsewhere
      noAnimateClosed($('.clicked'), App.tileList.findWhere({clicked:true}));
      slideOpen($(e.currentTarget),tile);
    }
  }

}

function offOthers(tile){
  var rowTiles = tile.collection.getModels(tile.get('row')),
      id = tile.get('index'),
      mod = id%App.COLUMNS,
      set;
  if(rowTiles.length == 1){
    set = $();
    return
  }
  rowTiles.forEach(function(tile, i){
    if(i!=mod){
      if(!set)
        set = getJ(rowTiles[i]);
      else
        set = set.add(getJ(rowTiles[i]));
    }
  });
  App.set = set;
  App.set.css('display','none');
}
function onOthers(tile){
  if(tile.collection.getModels(tile.get('row')).length==1)
    return
  App.set.css('display','block');
  if(tile.get('index')%App.COLUMNS != 0)
    getJ(tile).insertAfter(getJ(tile.prev()));
}
function getJ(tile){
  if(tile){
    var id = tile.get('index');
    return $('[data-id=' + id + ']');
  }
  return $('');
}
