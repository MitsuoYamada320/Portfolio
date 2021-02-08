$(function (){
	//HedderçÏê¨ÅG
	createHedder();

	$('body').fadeIn(1500);

	//#hamburgerâüâ∫éû
	$('.fa-fish').on('click',function(){
		$(this).css({transform:"rotateZ(180deg)"});
		setTimeout(function(){window.location.href = './index.html'}, 1000);
	});

	//hamburgeMenu
	$('#hamburger').on('click',function(){
		animationHamburger();
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
	if("hamburger_off" == $('#hamburger').attr('class')){
  $('html').attr({'style': "overflow:hidden;"});
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
	$('#side_nav ul').append('<li><a href="./about.html">ABOUT</a></li>');
	$('#side_nav ul').append('<li><a href="./labo.html">LABO</a></li>');
}