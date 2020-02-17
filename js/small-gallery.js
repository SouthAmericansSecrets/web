$( document ).ready(function() {
	window.setTimeout(function(){
		$('.slick-autoplay').slick({
			slidesToShow: 6,
			slidesToScroll: 1,
			autoplaySpeed: 2000,
			mobileFirst:true,
			infinite:true,
			arrows: false,
			autoplay:true,
			dots:false
		});
		$('.slick-autoplay').magnificPopup({
		  delegate: 'a',
		  type: 'image',
			gallery: {
        enabled:true
      }
		});
	}, 500);
});
