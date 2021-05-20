$(function (){
	const MAEGIN_SIZE = 10;
	const MOBILE_WIDTH = 640;
	const MOTION_SPEED = 250;

	var startCoordX, moveCoordX, endCoordX;
	var dispPage = 1;
	var dispWidth =  $(window).width();
	var showWinMargin =  parseInt($('.show_window ul li').css('margin-left'), 10);
	var showWinWidth =  $(window).width() - (showWinMargin * 2);
	var palamNumList = [];
	var skllPalam = [];

	createView();

	//MakeSmallWindow
	$('.small_window').append('<ul><li class="opacity_on"></li></ul>');

	for(var i = 0; i < $('.show_window ul li').length - 1 ; i++ ){
		$('.small_window ul').append('<li class="opacity_off"></li>');
	}

	//small_windowの幅
	$('.small_window ul').css({ 'width':((numOfImg * MAEGIN_SIZE) + ((numOfImg + 1) * 5)) + "px" });

	//tap_next
	$('#btn_up').on('click',function(){
		if(dispPage != $('.show_window ul li').length){
			dispPage = pageScrollUp(($('.show_window ul li').outerWidth() + showWinMargin) * dispPage, dispPage);
		}
	});

	//tap_down
	$('#btn_down').on('click',function(){
		if(dispPage != 1){
			dispPage = pageScrollDown(($('.show_window ul li').outerWidth() + showWinMargin) * (dispPage -2), dispPage);
		}
	});

	//画面リサイズ処理
	$(window).resize(function() {
		if(dispWidth != $(window).width()){
			createView();
			window.location.reload();
		}
	});

		/**         スキルパラメータ　　　　　　***/
		//値をセット
		$('.skill_palam').each(function(index) {
			palamNumList.push($(this).attr("value"));
			skllPalam.push($(this).offset().top);
		});

		//パラメータアニメーション
		$(window).on('scroll load',function(){
			for(var i = 0; i < skllPalam.length ; i++){
				if((skllPalam[i] - 60) < ($(window).height() + $(window).scrollTop())){
					if(10 == $("#00" + i + " .skill_palam").width()){
						var setValue = $(".palam").width() * (palamNumList[i] / 100) + "px";
						paramCount(i);
						$("#00" + i + " .skill_palam" ).animate({'width': setValue },2000);
						$("#00" + i + " p" ).animate({'margin-left': setValue },2000);
					}
				}
			}
		});

		/**   コンテンツタイトル　アニメーション　　　**/
		$('.cont_ttl span').addClass('line_hide line_view');
		$('.cont_ttl h1').addClass('obj_inview obj_hide');

		$('.cont_ttl h1').each(function(index) {
			$(this).bind('inview', function(event, isInView, visiblePartX, visiblePartY) {
			// 画面に入っていない場合 終了
				if (!isInView) return;
				// 非表示じゃない場合 終了
				if (!$(this).hasClass('obj_hide')) return;

				// 対象取得
				var obj = $(this);
				setTimeout(function() {
					$(obj).removeClass('obj_hide');
					$('#cont_ttl_00'+ (index + 1) +' span').removeClass('line_hide');
				}, 200);
			});
		});

	/**　画面サイズ：MOBILE時の処理　**/
	if(MOBILE_WIDTH >= $(window).width()){

		var el = $('.show_window ul');

		/** 画面タップ時発火　**/
		el.bind('touchstart', function(){
			event.preventDefault();
			touchControl(event.changedTouches[0].pageX, "start");
			moveControl(dispPage,event.changedTouches[0].pageX, "start");
		});

		/** 画面ドラッグ中　発火　**/
		el.bind('touchmove', function(){
			event.preventDefault();
			moveControl(dispPage,event.changedTouches[0].pageX, "move");
		});

		/** 画面から離れた時　発火　**/
		el.bind('touchend', function(){
			event.preventDefault();
			touchControl(event.changedTouches[0].pageX, "end");
		});

		/****************************************/
		/**  画面タップ時の処理コントロール　    **/
		/****************************************/
		function touchControl(tapCoordX ,tapType){
			if(tapType == "start"){
				startCoordX = tapCoordX;
				endCoordX = "";
			}else{
				endCoordX = tapCoordX;
				dispPage = pageScroll(dispPage, startCoordX, endCoordX);
			}
		}

		/****************************************/
		/**  画面ドラッグ時の処理コントロール　  **/
		/****************************************/
		function moveControl(dispPage, tapCoordX ,tapType){
			if(tapType == "start"){
				startCoordX = tapCoordX;
				moveCoordX = "";
			}else{
				moveCoordX = tapCoordX;
				pageMove(dispPage, startCoordX, moveCoordX);
			}
		}

		/****************************************/
		/**      ページスクロール処理           **/
		/***************************************/
		function pageScroll(dispPage, startCoordX, endCoordX){
			if(startCoordX > (endCoordX + 50)){
				if(dispPage != $('.small_window ul li').length){
					$('.show_window').animate({scrollLeft: (showWinWidth + showWinMargin) * dispPage }, MOTION_SPEED, "swing");
					activePage(dispPage + 1);
					dispPage = dispPage + 1;
				}else{
					$('.show_window').animate({scrollLeft: (showWinWidth + showWinMargin) * (dispPage - 1) }, MOTION_SPEED, "swing");
				}
			} else if(startCoordX < (endCoordX - 50)) {
				if(dispPage != 1) {
					$('.show_window').animate({scrollLeft: (showWinWidth + showWinMargin) * (dispPage -2) }, MOTION_SPEED, "swing");
					activePage(dispPage - 1);
					dispPage = dispPage - 1;
				}
			} else {
					$('.show_window').animate({scrollLeft: (showWinWidth  + showWinMargin) * (dispPage -1) }, MOTION_SPEED, "swing");
			}
			return dispPage;
		}

		/****************************************/
		/**　　　　　　 ドラッグ処理 　　 　　　**/
		/***************************************/
		function pageMove(dispPage, startCoordX, moveCoordX){
			var drug_position;
			if(startCoordX > moveCoordX){
				drug_position = startCoordX - moveCoordX;
				$('.show_window').animate({scrollLeft:(showWinWidth * (dispPage - 1) + showWinMargin * dispPage ) + drug_position }, 0.2, "swing");
			} else {
				drug_position = moveCoordX - startCoordX;
				$('.show_window').animate({scrollLeft:(showWinWidth * (dispPage - 1) + showWinMargin * dispPage ) - drug_position }, 0.2, "swing");
			}
		}
　}

	/****************************************/
	/*機能：画面リサイズ　　　　　　　　　　　　*/
	/****************************************/
	function createView(){
		numOfImg = $('.show_window ul li').length;
		showWinMargin =  parseInt($('.show_window ul li').css('margin-left'), 10);
		dispPage = 0;

		dispPage = pageScrollUp(showWinWidth * dispPage, dispPage);

		//title_areaの高さを端末サイズでセット
		$('.title_area').css({"height":($(window).height()-40)});

		if(MOBILE_WIDTH >= $(window).width()){
			$('.show_window').css({"width":showWinWidth,"height":showWinWidth,"margin":showWinMargin});
			$('.show_window ul li img ,.show_window ul li').css({"width":showWinWidth, "height":showWinWidth});
			$('.btn_area').css({"width":dispWidth});
			$('.show_window ul').css({"width":((showWinWidth + showWinMargin) * numOfImg + showWinMargin), "height":showWinWidth, "margin-left":-(showWinMargin)});
		}else{
			$('.btn_area').css({"width":$('.show_window ul li').width() + 20});
			$('.show_window ul').css({"width":(($('.show_window ul li').outerWidth() + showWinMargin) * numOfImg + showWinMargin), "margin-left":-(showWinMargin)});
		}
	}

	/****************************************/
	/*機能：画面リサイズ　　　　　　　　　　　　*/
	/****************************************/
	function paramCount(index) {
		$({count: 0}).animate({count: palamNumList[index]}, {
			duration: 2000,
			easing: 'linear',
			progress: function() {
			$("#00" + index + " p").text(Math.ceil(this.count));
		}});
	};

	/****************************************/
	/*機能：pageScrollUp　　　　　　　　　　　*/
	/****************************************/
	function pageScrollUp(scroll_amount, dispPage){
		$('.show_window').animate({scrollLeft: scroll_amount }, MOTION_SPEED, "swing");
		activePage(dispPage + 1);
		return dispPage = dispPage + 1;
	}

	/****************************************/
	/*機能：pageScrollDown　　　　　　　　　　*/
	/****************************************/
	function pageScrollDown(scroll_amount, dispPage){
		$('.show_window').animate({scrollLeft: scroll_amount }, MOTION_SPEED, "swing");
		activePage(dispPage - 1);
		return dispPage = dispPage - 1;
	}

	/****************************************/
	/*機能：activePage処理　　　　　　　　　　*/
	/****************************************/
	function activePage(page){
		$('.small_window ul li').attr({'class':'opacity_off'});
		$('.small_window ul li:nth-child(' + page +')').attr({'class':'opacity_on'});
	}

});
