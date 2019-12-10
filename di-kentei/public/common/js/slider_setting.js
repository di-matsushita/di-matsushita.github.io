/*
 * slider_setting.js
 */

jQuery(document).ready(function($) {
/* ==========================================================
!top
========================================================== */
/* mainimg
------------------------------------ */
	$('#mainimg .slick01').slick({
		//PC first
		arrows: false,          // 前次ボタンを表示するか [初期値:true]
		autoplay: true,         // 自動再生するか [初期値:false]
		autoplaySpeed: 9000,    // 自動再生で切り替えする時間(ミリ秒) [初期値:3000]
		centerMode: true,       // slidesToShowが奇数のとき、現在のスライドを中央に表示するか [初期値:false]
		centerPadding: '0px',   // centerMode:trueのとき、左右のスライドをチラ見せさせる幅 [初期値:'50px']
		fade: true,             // スライド切り替えをフェードするか [初期値:false]
		speed: 1000             // スライド/フェードさせるスピード（ミリ秒） [初期値:300]
	});

/* hoge
------------------------------------ */
	$("#hoge .slick02").slick({
		//PC first
		autoplay: true,         // 自動再生するか [初期値:false]
		autoplaySpeed: 5000,    // 自動再生で切り替えする時間(ミリ秒) [初期値:3000]
		arrows: true,           // 前次ボタンを表示するか [初期値:true]
		centerMode: true,       // slidesToShowが奇数のとき、現在のスライドを中央に表示するか [初期値:false]
		centerPadding: '60px',  // centerMode:trueのとき、左右のスライドをチラ見せさせる幅 [初期値:'50px']
		dots: false,            // ドットナビゲーションを表示するか [初期値:false]
		infinite: true,         // スライドをループさせるか [初期値:true]
		slidesToShow: 1,        // 表示させるスライド数 [初期値:1]
		slidesToScroll: 1,      // 一度に移動させるスライド数 [初期値:1]
		speed: 800,             // スライド/フェードさせるスピード（ミリ秒） [初期値:300]
		variableWidth: true     // 横幅がバラバラなスライドにするか [初期値:false]
	});

});
