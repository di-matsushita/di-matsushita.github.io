/*
 * slider_setting.js
 */

jQuery(document).ready(function($) {
/* ==========================================================
!top
========================================================== */
/* mainimgのニュース
------------------------------------ */
	$('.top_news').slick({
		//PC first
		dots: false,
		infinite: true,
		speed: 800,
		slidesToShow: 1,
		centerMode: false,
		variableWidth: false,
		autoplay: true,
		autoplaySpeed: 8000,
		variableWidth: false,
		arrows: true,
		fade: false,
		vertical: true, //縦
		prevArrow: '<button type="button" class="slick-prev"><span>前のニュースへ</span></button>',
		nextArrow: '<button type="button" class="slick-next"><span>次のニュースへ</span></button>',
	});

	var newsIsPlaying = true; //フラグを用意
	$('.top_news_buttons .button_play').hide();
			
	$('.top_news_buttons .playbutton').click(function(){
		if(newsIsPlaying) {
			$('.top_news_buttons .button_play').show();
			$('.top_news_buttons .button_pause').hide();
			newsIsPlaying = false;
			$('.top_news').slick('slickPause');
			$('.top_news_buttons .button_play').focus();
		} else {
			$('.top_news_buttons .button_play').hide();
			$('.top_news_buttons .button_pause').show();
			newsIsPlaying = true;
			$('.top_news').slick('slickPlay');
			$('.top_news_buttons .button_pause').focus();
		}
	});

/* プロジェクト
------------------------------------ */
	$("#project .slider").slick({
		//PC first
		autoplay: true,
		autoplaySpeed: 5000,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		centerMode: true,
		centerPadding: '0',
		variableWidth: true,
		arrows: true,
		dots: false,
		prevArrow: '<button type="button" class="slick-prev"><span>前のプロジェクトへ</span></button>',
		nextArrow: '<button type="button" class="slick-next"><span>次のプロジェクトへ</span></button>',
		//ここから一時的な設定
		//draggable: false,
		//initialSlide: 1,
		//ここまで一時的な設定
		responsive: [
			{
				//640以下
				breakpoint: 640,
				settings: {
					autoplay: true,
					autoplaySpeed: 5000,
					slidesToShow: 1,
					slidesToScroll: 1,
					variableWidth: true,
					arrows: true
				}
			}
		]
	});

	var projectIsPlaying = true; //フラグを用意
	$('.top_project_buttons .button_play').hide();
			
	$('.top_project_buttons .playbutton').click(function(){
		if(projectIsPlaying) {
			$('.top_project_buttons .button_play').show();
			$('.top_project_buttons .button_pause').hide();
			projectIsPlaying = false;
			$('#project .slider').slick('slickPause');
			$('.top_project_buttons .button_play').focus();
		} else {
			$('.top_project_buttons .button_play').hide();
			$('.top_project_buttons .button_pause').show();
			projectIsPlaying = true;
			$('#project .slider').slick('slickPlay');
			$('.top_project_buttons .button_pause').focus();
		}
	});


/* 制作実績
------------------------------------ */
	$("#works .slider").slick({
		//PC first
		autoplay: true,
		autoplaySpeed: 5000,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		centerMode: true,
		centerPadding: '0',
		variableWidth: true,
		arrows: true,
		dots: false,
		prevArrow: '<button type="button" class="slick-prev"><span>前の制作実績へ</span></button>',
		nextArrow: '<button type="button" class="slick-next"><span>次の制作実績へ</span></button>',
		responsive: [
			{
				//640以下
				breakpoint: 640,
				settings: {
					autoplay: true,
					autoplaySpeed: 5000,
					slidesToShow: 1,
					slidesToScroll: 1,
					variableWidth: true,
					arrows: true
				}
			}
		]
	});

	var worksIsPlaying = true; //フラグを用意
	$('.top_works_buttons .button_play').hide();
		
	$('.top_works_buttons .playbutton').click(function(){
		if(worksIsPlaying) {
			$('.top_works_buttons .button_play').show();
			$('.top_works_buttons .button_pause').hide();
			worksIsPlaying = false;
			$('#works .slider').slick('slickPause');
			$('.top_works_buttons .button_play').focus();
		} else {
			$('.top_works_buttons .button_play').hide();
			$('.top_works_buttons .button_pause').show();
			worksIsPlaying = true;
			$('#works .slider').slick('slickPlay');
			$('.top_works_buttons .button_pause').focus();
		}
	});
});
