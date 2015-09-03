var dt = 1000; //1000 millisecond delay
$('all-tiles').css('max-height','330px');
$('all-tiles').css('overflow','hidden');

function tileFade() {
  $('.all-tiles:not(.clicked)').animate({'opacity':'0'},dt/2,
   	function(){$(this).animate({'opacity':'1'},dt/2)}
  );
}
function slideOpen(tile) {
	console.log('open');
	var $tile = tile;
  $tile.addClass('clicked');
  $tile.find('img').animate({width: '30%'},dt);
  $tile.find('p.preclick').css('display','none');
  $tile.find('p.tclick').css('display','block');
  $tile.css('max-width','1000');
  $tile.animate({width:$('#grid').width(),}, dt);

  tileFade();

  $tile.find('svg').toggle();
  $tile.css('margin-bottom','20px');
  $tile.css('opacity','1');
  $tile.find('h2').addClass('sl-title');
  $tile.find('p.tclick').animate({'opacity':'1'},2*dt);
  $tile.find('img').css('opacity','1');
}
function slideClosed(tile) {
	console.log('closed');
	var defaultWidth = $('.all-tiles:not(.clicked)').width();
	var $tile = tile;
  $tile.find('p.preclick').css('display','block');
  $tile.find('p.tclick').css('display','none');
  $tile.find('img').animate({width: '100%'},{
    duration: dt,
    complete: function(){
      var tile = App.tileList.where({clicked:true})[0];
      var id = tile.get('id');
      var idminus = id - 1;
      $('[data-id=' + id + ']').insertAfter($('[data-id='+ idminus +']'));
    }
  });
  $tile.animate({width:defaultWidth}, dt);

  tileFade();

  $tile.removeClass('clicked');
  $tile.find('svg').toggle();
  $tile.css('margin-bottom','-30px');
  $('.tclick').css('opacity','0');
  $tile.find('h2').removeClass('sl-title');
  $tile.find('img').css('opacity','0.7');
}
$(document).ready(function(){
  var TriggerClick = 0;


  $('.all-tiles').click(function(e){

  	console.log(this);
  	e.preventDefault();
    // Nothing Open
    if($('.clicked').length == 0){

      // Absurdly complicated re-ordering
      var tileIndex = e.currentTarget.attributes[2].value; //data-id attribute
      if(tileIndex%4 != 0){
        var row = Math.floor(tileIndex/4);
        var first = $('.grid').children().eq(4*row);
        $(this).insertBefore(first);
      }
      slideOpen($(this));
    }
    else{
    	// Something is open
    	if($(this)[0] == $('.clicked')[0]){
    		// User clicked on same tile
	    	slideClosed($('.clicked'));
      // $(this).insertAfter($('.grid').children().eq(tileIndex));
    	}
    	else{
    		// User clicked elsewhere
	    	slideClosed($('.clicked'));
      	slideOpen($(this));
    	}
    }

  });
});