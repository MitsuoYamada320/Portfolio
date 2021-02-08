$(function (){

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
	
	
	//‰æ–ÊƒXƒNƒ[ƒ‹—Ê‚ğæ“¾
	$(window).on('scroll load',function(){
		for(var i = 0; i <= skllPalam.length ; i++ ){
			if((skllPalam[i] - 60) < (getDisplayHeight() + $(window).scrollTop())){
				if(10 == $("#00" + i + " .skill_palam").width()){
					var setValue = 300 * (palamNumList[i] / 100) + "px";
					paramertertr(i);
					$("#00" + i + " .skill_palam" ).animate({'width': setValue },2000);
					$("#00" + i + " p" ).animate({'margin-left': setValue },2000);
				}
			}
		}
	});
});