$(function (){
	var start_X, end_X;
	var topAttr = [];
	var dispPage = 1;
	const SMALL_WIN_WIDTH = 10;
	const MOTION_SPEED = 250;
	const MOBILE_WIDTH = 375;
	dispWidth =  $(window).width();

	createView();

		//MakeSmallWindow
		$('.small_window').append('<ul><li class="opacity_on"></li></ul>');

		for(var i = 0; i < $('.show_window ul li').length - 1 ; i++ ){
			$('.small_window ul').append('<li class="opacity_off"></li>');
		}

		//small_windowの幅
		$('.small_window ul').css({ 'width':((numOfImg * SMALL_WIN_WIDTH) + ((numOfImg + 1) * 5)) + "px" });

	//tap_next
	$('#btn_up').on('click',function(){
		if(dispPage != $('.show_window ul li').length){
			dispPage = pageScrollUp(($('.show_window ul li').outerWidth() + imgMargin) * dispPage, dispPage);
		}
	});

	//tap_down
	$('#btn_down').on('click',function(){
		if(dispPage != 1){
			dispPage = pageScrollDown(($('.show_window ul li').outerWidth() + imgMargin) * (dispPage -2), dispPage);
		}
	});

/**********************************************/
/*************画面サイズ : MOBILE**************/
/**********************************************/
if(MOBILE_WIDTH >= $(window).width()){

	//画面スクロール量を取得
	$(window).on('scroll load',function(){
		for(var i = 0; i <= topAttr.length ; i++ ){
			if(topAttr[i] < (getDisplayHeight() + $(window).scrollTop())){
				$("#articleId_00"+ (i + 1)).removeAttr('class');
				$("#articleId_00"+ (i + 1)).attr({'class':'article art_after'});
			}
		}
	});

	var el = $('.show_window ul');

	//touchstart
	el.bind('touchstart', function(){
		event.preventDefault(); 
		var tap_start_X = event.changedTouches[0].pageX;
		touchControl(tap_start_X,"start");
		moveControl(dispPage,tap_start_X,"start");
	});

	//touchmove
	el.bind('touchmove', function(){
		event.preventDefault(); 
		var tap_move_X =  event.changedTouches[0].pageX;
		moveControl(dispPage,tap_move_X,"move");
	});

	//touchend
	el.bind('touchend', function(){
		event.preventDefault(); 
		var tap_end_X =  event.changedTouches[0].pageX;
		touchControl(tap_end_X,"end");
	});

	function touchControl(position_X ,tap_type){
		if(tap_type == "start"){
			start_X = position_X;
			end_X = "";
		}else{
			end_X = position_X;
			dispPage = pageScroll(dispPage, start_X, end_X);
		}
	}

	function moveControl(dispPage, position_X ,tap_type){
		if(tap_type == "start"){
			start_X = position_X;
			move_X = "";
		}else{
			move_X = position_X;
			pageMove(dispPage, start_X, move_X);
		}
	}

	/** PageScroll **/
	function pageScroll(dispPage, start_X, end_X){
		if(start_X > (end_X + 50)){
			if(dispPage != $('.small_window ul li').length){
				$('.show_window').animate({scrollLeft: ((dispWidth - 20) + imgMargin) * dispPage }, MOTION_SPEED, "swing");
				activePage(dispPage + 1);
				dispPage = dispPage + 1;
			}else{
				$('.show_window').animate({scrollLeft: ((dispWidth - 20) + imgMargin) * (dispPage - 1) }, MOTION_SPEED, "swing");
			}
		} else if(start_X < (end_X - 50)) {
			if(dispPage != 1) {
				$('.show_window').animate({scrollLeft: ((dispWidth - 20) + imgMargin) * (dispPage -2) }, MOTION_SPEED, "swing");
				activePage(dispPage - 1);
				dispPage = dispPage - 1;
			}
		} else {
				$('.show_window').animate({scrollLeft: ((dispWidth - 20)  + imgMargin) * (dispPage -1) }, MOTION_SPEED, "swing");
		}
		return dispPage;
	}

	/** PageScroll **/
	function pageMove(dispPage, start_X, move_X){
		var drug_position;
		if(start_X > move_X){
			drug_position = start_X - move_X;
			$('.show_window').animate({scrollLeft:((dispWidth - 20) * (dispPage - 1) + imgMargin * dispPage ) + drug_position }, 0.2, "swing");
		}
		if(start_X < move_X){
			drug_position = move_X - start_X;
			$('.show_window').animate({scrollLeft:((dispWidth - 20) * (dispPage - 1) + imgMargin * dispPage ) - drug_position }, 0.2, "swing");
		}
	}

	/** PageScrollUp **/
	function pageScrollMove(id, scroll_amount, dispPage){
		$(id).animate({scrollLeft: scroll_amount }, 0.2, "swing");
	}

	/** FadeInPage **/
	function fadeInPage(){
		//UP
		if(start_X > (end_X + 50)){
			if(dispPage != $('#box ul li').length){
				pageScrollUp('#box',(li_width + show_win_margin) * dispPage);
			}
		}
		//DOWN
		if(start_X < (end_X - 50)){
			if(dispPage != 1) {
				pageScrollDown('#box', (li_width + show_win_margin) * (dispPage -2));
			}
		}
	}


/**********************************************/
/*************画面サイズ : PC******************/
/**********************************************/
	}else{

	}
 function createView(){
		numOfImg = $('.show_window ul li').length;
		imgMargin =  parseInt($('.show_window ul li').css('margin-left'), 10);
		dispPage = 0;

		dispPage = pageScrollUp((dispWidth -10 ) * dispPage, dispPage);

		//title_areaの高さを端末サイズでセット
		$('.title_area').css({"height":(getDisplayHeight()-40)});

		console.log($(window).width());

		if(MOBILE_WIDTH >= $(window).width()){
			$('.show_window').css({"width":(dispWidth-20),"height":(dispWidth-20),"margin":imgMargin});
			$('.show_window ul li').css({"width":(dispWidth-20),"line-height":(dispWidth-20)+"px"});
			$('.button_area').css({"width":dispWidth});
		}else{
			$('.button_area').css({"width":"320px"});
		}

		$('.show_window ul').css({"margin-left":-(imgMargin)});

		//articleの座標を取得
		for(var i = 0; i < $('main .article').length ; i++ ){
			topAttr.push($('main .article:nth-child('+ (i + 1) +')').offset().top);
		}

		//Show Window全体のX幅をセット
		$('.show_window ul').css({"width":(dispWidth * numOfImg + (numOfImg + 1) * 10 ) + "px"});
	}

	/** Up **/
	function pageScrollUp(scroll_amount, dispPage){
		$('.show_window').animate({scrollLeft: scroll_amount }, MOTION_SPEED, "swing");
		activePage(dispPage + 1);
		return dispPage = dispPage + 1;
	}

	/** Down **/
	function pageScrollDown(scroll_amount, dispPage){
		$('.show_window').animate({scrollLeft: scroll_amount }, MOTION_SPEED, "swing");
		activePage(dispPage - 1);
		return dispPage = dispPage - 1;
	}

	/** activePage **/
	function activePage(page){
		$('.small_window ul li').attr({'class':'opacity_off'});
		$('.small_window ul li:nth-child(' + page +')').attr({'class':'opacity_on'});
	}

	//リサイズ
	$(window).resize(function() {
			if(dispWidth != $(window).width()){
				createView();
				window.location.reload();
			}
	});
});