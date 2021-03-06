$(function (){

	$('body').fadeIn(1500);

	//#hamburger押下時
	$('.fa-fish').on('click',function(){
		$(this).css({transform:"rotateZ(180deg)"});
		setTimeout(function(){window.location.href = './index.html'}, 1000);
	});

	//hamburgeMenu
	$('#hamburger').on('click',function(){
		animationHamburger();
	});

	$('#side_nav ul li a').on('click',function(){
		animationHamburger();
	});

	var inviewItem = '.art_box img,.svg_box img,.pane2 img, #eye_001, .eye';

	// inview
	$(inviewItem).addClass('obj_inview obj_hide');

	$(inviewItem).each(function(index){
		$(this).bind('inview', function(event, isInView, visiblePartX, visiblePartY){
			// 画面に入っていない場合 終了
			if (!isInView) return;
			// 非表示じゃない場合 終了
			if (!$(this).hasClass('obj_hide')) return;

			// 対象取得
			var obj = $(this);
			setTimeout(function() {
				$(obj).removeClass('obj_hide');
			});
		});
	});
});

function animationHamburger(){
	const MOBILE_WIDTH = 640;
		if("hamburger_off" == $('#hamburger').attr('class')){
			if(MOBILE_WIDTH >= $(window).width()){
 			$('html').attr({'style': "overflow:hidden;"});
			}
				$('#hamburger').attr({'class':'hamburger_on'});
				$('#side_nav').attr({'class':'nav_on'});
		}else{
 			$('html').removeAttr('style');
				$('#hamburger').attr({'class':'hamburger_off'});
				$('#side_nav').attr({'class':'nav_off'});
		}
	}
