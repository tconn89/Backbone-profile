var $tile = $( ".all-tiles"); 
var twidth = $tile.width();
var gwidth = $('#grid').width();
var dt = 1000; //1000 millisecond delay
$tile.css('max-height','330px');
$tile.css('overflow','hidden');
$(document).ready(function(){
  var TriggerClick = 0;

  // !!!!!! OMG REFACTOR CLICK FUNCTION !!!!!!!!!

  $tile.click(function(e){
  	$tile = $(this);
  	console.log(this);
  	e.preventDefault();
    if(TriggerClick==0){
         TriggerClick=1;
         console.log(TriggerClick);
         $tile.addClass('clicked');
         $tile.find('img').animate({width: '30%'},dt);
         $tile.find('p.preclick').css('display','none');
         $tile.find('p.tclick').css('display','block');
         $tile.css('max-width','1000');
         $tile.animate({width:gwidth,}, dt);
         $('.all-tiles:not(.atile-one)').animate({'opacity':'0'},dt/2,
         	function(){$(this).animate({'opacity':'1'},dt/2)}
         	);
         $tile.find('svg').toggle();
         $tile.css('margin-bottom','20px');
         $tile.css('opacity','1');
         $tile.find('h2').addClass('sl-title');
         $tile.find('p.tclick').animate({'opacity':'1'},2*dt);
         $tile.find('img').css('opacity','1');
    }else{
         TriggerClick=0;
         console.log(TriggerClick);
         $tile.removeClass('clicked');
         $tile.find('p.preclick').css('display','block');
         $tile.find('p.tclick').css('display','none');
         $tile.find('img').animate({width: '100%'},dt);
         $tile.animate({width:twidth}, dt);
         $('.all-tiles:not(.atile-one)').animate({'opacity':'0'},dt/2,
         	function(){$(this).animate({'opacity':'1'},dt/2)}
         	);
         $tile.find('svg').toggle();
         $tile.css('margin-bottom','-30px');
         $('.tclick').css('opacity','0');
         $tile.find('h2').removeClass('sl-title');
         $tile.find('img').css('opacity','0.7');
    }

		$tile = $( "all-tiles"); 
  });
});