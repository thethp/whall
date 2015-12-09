$(document).ready(start);
$(window).resize(repositionContent);
$(window).scroll(scrollLogic);
var bubbleWidth;
var currSlide = 0;
var maxLength;
var slidePaused = false;
var hasScrolled = false;

function start(_ev) {
    repositionContent();

    maxLength = $('.bubble-slide').length-1;

    $('.arrow._left').click({dir: -1}, shift);
    $('.arrow._right').click({dir: 1}, shift);
    $('.slidePicker').click(directSlide);
    window.setInterval(autoSlide, 3000);

    if(window.location.href.indexOf('#') >= 0) {
	hasScrolled = true;
    }
    window.setTimeout(function(_ev) {
	if(!hasScrolled) {
	    scrollTo('#who');
	}
    }, 5000);

    $('.menu-item').click(function(_ev) {
	_ev.preventDefault();
	scrollTo($(_ev.currentTarget).attr('href'));
    });

    $('.submit').click(submit);
}

function repositionContent(_ev) {
    bubbleWidth = $('.js-companies-bubble').width();
    $('.bubble-slide').width(bubbleWidth);
    $('.js-companies-bubble').height($('.bubble-wrap').height());

    $('.cover').css('height',window.innerHeight);
}

function scrollLogic(_ev) {
    hasScrolled = true;
    var scrollTop = $(this).scrollTop();
    if (scrollTop > window.innerHeight-10) {
	$('header').fadeIn(200);
    } else {
	$('header').fadeOut(200);
    }

    scrollTop+=50;
    if (scrollTop > $('#contact').offset().top) {
	$('.menu-item').removeClass('_active');
	$('.menu-item._contact').addClass('_active');
    } else if (scrollTop > $('#approach').offset().top) {
	$('.menu-item').removeClass('_active');
	$('.menu-item._approach').addClass('_active');
    } else if (scrollTop > $('#technologies').offset().top) {
	$('.menu-item').removeClass('_active');
	$('.menu-item._technologies').addClass('_active');
    } else if (scrollTop > $('#experience').offset().top) {
	$('.menu-item').removeClass('_active');
	$('.menu-item._experience').addClass('_active');
    } else if (scrollTop > $('#clients').offset().top) {
	$('.menu-item').removeClass('_active');
	$('.menu-item._clients').addClass('_active');
    } else if (scrollTop > $('#who').offset().top) {
	$('.menu-item').removeClass('_active');
	$('.menu-item._who').addClass('_active');
    }
}

function scrollTo(_section) {
    $('body, html').animate(
	{scrollTop: $(_section).offset().top},
	1000,
	function() {
	    window.location.hash = _section;
    });
}

function autoSlide(_ev) {
    if(slidePaused) {
	return 0;
    } else {
	data = {dir:1};
	_ev= {data};
	shift(_ev);
    }
}

function shift(_ev) {
    if(_ev.type == "click") {
	slidePaused = true;
	window.setTimeout(function() {
	    slidePaused = false;
	}, 9000);
    }

    currSlide += _ev.data.dir;
    if(currSlide < 0) {
	currSlide = maxLength;
    } else if (currSlide > maxLength) {
	currSlide = 0;
    }

    goToSlide();
}

function directSlide(_ev) {
    slidePaused = true;
    window.setTimeout(function() {
	slidePaused = false;
    }, 9000);
    currSlide = parseInt($(_ev.currentTarget).attr('slideNum'));
    goToSlide();
}

function goToSlide() {
    $('.slidePicker').removeClass('_active');
    $('.slidePicker[slideNum='+currSlide+']').addClass('_active');
    $('.bubble-wrap').css('left', 30+(-currSlide*(bubbleWidth+35)));
}

function submit(_ev) {
    _ev.preventDefault();

    $.ajax({
	type: 'POST',
	url: $('form').attr('action'),
	data: $('form').serialize()
    });
}
