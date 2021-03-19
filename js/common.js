$(function (){
	//Hedderì¬G
	createHedder();

	$('body').fadeIn(1500);

	//#hamburger‰Ÿ‰ºŽž
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

	var inviewItem = '.title_area img,.art_box img,.svg_box img,.pane2 img, #eye_001, .eye';
	// inview
	$(inviewItem).addClass('obj_inview obj_hide');

	$(inviewItem).each(function(index){
		$(this).bind('inview', function(event, isInView, visiblePartX, visiblePartY){
		// ‰æ–Ê‚É“ü‚Á‚Ä‚¢‚È‚¢ê‡ I—¹
			if (!isInView) return;
			// ”ñ•\Ž¦‚¶‚á‚È‚¢ê‡ I—¹
			if (!$(this).hasClass('obj_hide')) return;

			// ‘ÎÛŽæ“¾
			var obj = $(this);
			setTimeout(function() {
				$(obj).removeClass('obj_hide');
			});
		});
	});
});

/** MarginSize1 **/
function getMargin1(){
	return 10;
}

/** MarginSize2 **/
function getMargin2(){
	return 5;
}

/** DisplayWidth **/
function getDisplayWidth(){
	return $(window).width();
}

/** DisplayHeight **/
function getDisplayHeight(){
	return $(window).height();
}


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

/** createHedder **/
function createHedder(){
	$('#side_nav').append('<ul></ul>');
	$('#side_nav ul').append('<li><a href="./index.html">HOME</a></li>');
	$('#side_nav ul').append('<li><a href="./index.html#cont_ttl_001">ABOUT</a></li>');
	$('#side_nav ul').append('<li><a href="./index.html#cont_ttl_002">SKILL</a></li>');
	$('#side_nav ul').append('<li><a href="./illust.html">HOBBY</a></li>');
}
