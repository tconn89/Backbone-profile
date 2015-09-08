App.responsive = function(){
	var $winWidth = $(window).width();
	if($winWidth < 928){
		App.tileList.COLUMNS = 3;
	}
	else if($winWidth < 720)){
		App.tileList.COLUMNS = 2;
	}
	else if($winWidth < 432){
		App.tileList.COLUMNS = 1;
	}
	else
		App.tileList.COLUMNS = 4;
}

$(window).resize(function(){
	App.responsive();
})