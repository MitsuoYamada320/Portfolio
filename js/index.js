$(function (){
	const MAEGIN_SIZE = 10;
	const MOBILE_WIDTH = 640;
	const MOTION_SPEED = 250;
	
	var startCoordX, moveCoordX, endCoordX;
	var contTopAttr = [];
	var dispPage = 1;
	var dispWidth =  $(window).width();
	var showWinMargin =  parseInt($('.show_window ul li').css('margin-left'), 10);
	var showWinWidth =  $(window).width() - (showWinMargin * 2);

	createView();

	//MakeSmallWindow
	$('.small_window').append('<ul><li class="opacity_on"></li></ul>');

	for(var i = 0; i < $('.show_window ul li').length - 1 ; i++ ){
		$('.small_window ul').append('<li class="opacity_off"></li>');
	}

	//small_window�̕�
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

	//��ʃ��T�C�Y����
	$(window).resize(function() {
		if(dispWidth != $(window).width()){
			createView();
			window.location.reload();
		}
	});

		var palamNumList = [];
		var skllPalam = [];

		$('.skill_palam').each(function(index) {
			palamNumList.push( $(this).attr("value"));
			skllPalam.push($(this).offset().top);
		});

		function paramertertr(index) {
			$({count: 0}).animate({count: palamNumList[index]}, {
				duration: 2000,
				easing: 'linear',
				progress: function() {
		    $("#00" + index + " p").text(Math.ceil(this.count));
			}});
		};

		//��ʃX�N���[���ʂ��擾
		$(window).on('scroll load',function(){
			for(var i = 0; i < skllPalam.length ; i++){
				if((skllPalam[i] - 60) < (getDisplayHeight() + $(window).scrollTop())){
					if(10 == $("#00" + i + " .skill_palam").width()){
						var setValue = $(".palam").width() * (palamNumList[i] / 100) + "px";
						paramertertr(i);
						$("#00" + i + " .skill_palam" ).animate({'width': setValue },2000);
						$("#00" + i + " p" ).animate({'margin-left': setValue },2000);
					}
				}
			}
		});

/**********************************************/
/*************��ʃT�C�Y : MOBILE**************/
/**********************************************/
if(MOBILE_WIDTH >= $(window).width()){

	//��ʃX�N���[���ʂ��擾
	$(window).on('scroll load',function(){
		for(var i = 0; i <= contTopAttr.length ; i++ ){
			if(contTopAttr[i] < (getDisplayHeight() + $(window).scrollTop())){
				$(".cont:nth-child("+ (i + 1) + ")").fadein(3000);
			}
		}
	});

	$('.cont_ttl span').addClass('line_hide line_view');

	// inview
	$('.cont h1').addClass('obj_inview obj_hide');

	$('.cont h1').each(function(index) {
		$(this).bind('inview', function(event, isInView, visiblePartX, visiblePartY) {
		// ��ʂɓ����Ă��Ȃ��ꍇ �I��
			if (!isInView) return;
			// ��\������Ȃ��ꍇ �I��
			if (!$(this).hasClass('obj_hide')) return;

			// �Ώێ擾
			var obj = $(this);
			setTimeout(function() {
				$(obj).removeClass('obj_hide');
				$('#cont_ttl_00'+ (index + 1) +' span').removeClass('line_hide');
			}, 200);
		});
	});

	var el = $('.show_window ul');

	//touchstart
	el.bind('touchstart', function(){
		event.preventDefault();
		touchControl(event.changedTouches[0].pageX, "start");
		moveControl(dispPage,event.changedTouches[0].pageX, "start");
	});

	//touchmove
	el.bind('touchmove', function(){
		event.preventDefault();
		moveControl(dispPage,event.changedTouches[0].pageX, "move");
	});

	//touchend
	el.bind('touchend', function(){
		event.preventDefault();
		touchControl(event.changedTouches[0].pageX, "end");
	});

	function touchControl(tapCoordX ,tapType){
		if(tapType == "start"){
			startCoordX = tapCoordX;
			endCoordX = "";
		}else{
			endCoordX = tapCoordX;
			dispPage = pageScroll(dispPage, startCoordX, endCoordX);
		}
	}

	function moveControl(dispPage, tapCoordX ,tapType){
		if(tapType == "start"){
			startCoordX = tapCoordX;
			moveCoordX = "";
		}else{
			moveCoordX = tapCoordX;
			pageMove(dispPage, startCoordX, moveCoordX);
		}
	}

	/** PageScroll **/
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

	/** PageScroll **/
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

	function createView(){
		numOfImg = $('.show_window ul li').length;
		showWinMargin =  parseInt($('.show_window ul li').css('margin-left'), 10);
		dispPage = 0;

		dispPage = pageScrollUp(showWinWidth * dispPage, dispPage);

		//title_area�̍�����[���T�C�Y�ŃZ�b�g
		$('.title_area').css({"height":(getDisplayHeight()-40)});

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
});
