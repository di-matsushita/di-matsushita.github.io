/*
 * common.js
 */

jQuery(document).ready(function($) {
/* ==========================================================
!stack
========================================================== */
/* 関数の読み込み
------------------------------------ */
	rollover();
	pageTop();
	pageTopFixed();
	pageScroll();
	Accordion();
	tabMenu();

/* ==========================================================
!外部JS(プラグイン)の個別記述はここに記述する
========================================================== */
/* スクロールエフェクト
------------------------------------ */
if(window.ScrollEffect){
	new ScrollEffect('#service,#identity,#project,#works,#news');
}
/* matchHeight
------------------------------------ */
	$('.height').matchHeight();
	$('.txt_height01').matchHeight();

/* typewriter
------------------------------------ */
	var TargetClassName = "typewriter"; // クラス名
	var DisplaySpeedMiliSec = 150; // 表示の速さ
	var CursorIcon = "｜"; // カーソルアイコン

	setTimeout(function() {displayLikeTypeWriter();}, 1500); //表示タイミングの遅延

	function displayLikeTypeWriter() {
		var counter = 0;
		var elements = document.getElementsByClassName(TargetClassName);
		for(var i = 0; i < elements.length; i++) {
			var element = elements[i];
			element.style.visibility = "visible";
			display(element, element.innerHTML, counter);
		}
	}

	function display(element, message, counter) {
		if(counter == 8) counter = 12;
		if(counter == 31) counter = 35;
		element.innerHTML = message.substring(0, counter) + CursorIcon;
		counter++;
		setTimeout(function() {
			display(element, message, counter);
		}, DisplaySpeedMiliSec);
		if (counter > message.length) {
			// 最後はカーソルアイコン表示を上書きする
			element.innerHTML = message;
		}
	}

/* window.matchMedia
------------------------------------ */
	var sp_menu_gnavi = $("#gnavi"); // クリック判定
	var sp_menu = $("#gnavi .menu_trigger"); // class用
	var flg = "close"; // フラグ判定用 初期は「閉じてる」
	var bgCover = $('#gnavi > ul > li:nth-of-type(2)'); // 透過背景

	if (window.matchMedia("(max-width:1099px)").matches) {
		// (1)windowの読み込みが完了したときに、1099px以下の場合に行いたいもの
		// ハンバーガーメニュー
		// ▼トリガーがクリックされたら
		sp_menu.on("click", function () {
			sp_menu_gnavi.toggleClass('on');
			sp_menu.toggleClass('active'); // 自分にactiveというclassをつける
			sp_menu.next().toggleClass('visible'); // 自分の兄弟要素にvisibleというclassをつける
			if(flg == "close"){ // flgがcloseだったら
				sp_menu.find("span").text("CLOSE"); // 自分の子要素のテキストを書き換え
				flg = "open"; // flgを「開いてる」状態にする
				$('body,html').css({"overflow":"hidden","height":"100%"}); //スクロール固定
			} else { // flgがcloseでなかったら
				sp_menu.find("span").text("MENU"); // 自分の子要素のテキストを書き換え
				flg = "close"; // flgを「閉じてる」状態にする
				$('body,html').css({"overflow":"visible","height":"auto"});//スクロール固定解除
			}
		});
		// ▼透過背景がクリックされたら
		bgCover.on("click", function () {
			sp_menu_gnavi.toggleClass('on');
			sp_menu.toggleClass('active'); // 自分にactiveというclassをつける
			sp_menu.next().toggleClass('visible'); // 自分の兄弟要素にvisibleというclassをつける
			if (flg == "open") { // flgがopenだったら
				sp_menu.find("span").text("MENU"); // 自分の子要素のテキストを書き換え
				flg = "close"; // flgを「閉じてる」状態にする
				$('body,html').css({ "overflow": "visible" });//スクロール固定解除
				sp_menu.focus();
			}
		});
		// ▼トリガーフォーカス時にキーボードが押されたら
		sp_menu.on("keyup", function (e) {
			if (e.keyCode == 13) { //それがエンターキーだったら
				sp_menu_gnavi.toggleClass('on');
				sp_menu.toggleClass('active'); // 自分にactiveというclassをつける
				sp_menu.next().toggleClass('visible'); // 自分の兄弟要素にvisibleというclassをつける

				if (flg == "close") { // flgがcloseだったら
					sp_menu.find("span").text("CLOSE"); // 自分の子要素のテキストを書き換え
					flg = "open"; // flgを「開いてる」状態にする
					$('body,html').css({ "overflow":"hidden","height":"100%" }); //スクロール固定

				} else { // flgがcloseでなかったら
					sp_menu.find("span").text("MENU"); // 自分の子要素のテキストを書き換え
					flg = "close"; // flgを「閉じてる」状態にする
					$('body,html').css({ "overflow":"visible","height":"auto" });//スクロール固定解除
				}
			} else if (e.keyCode == 27) { //それがエスケープーキーだったら
				if (flg == "open") { // flgがopenだったら
					sp_menu_gnavi.removeClass('on');
					sp_menu.removeClass('active'); // 自分にactiveというclassをつける
					sp_menu.next().removeClass('visible'); // 自分の兄弟要素にvisibleというclassをつける
					sp_menu.find("span").text("MENU"); // 自分の子要素のテキストを書き換え
					flg = "close"; // flgを「閉じてる」状態にする
					$('body,html').css({ "overflow":"visible","height":"auto" });//スクロール固定解除
				}
			}
		});
		// ▼トリガー以外にフォーカスされている時キーボードが押されたら
		$(document).on("keyup", function (e) {
			if (e.keyCode == 27) { //それがエスケープーキーだったら
				if (flg == "open") { // flgがopenだったら
					sp_menu_gnavi.removeClass('on');
					sp_menu.removeClass('active'); // 自分にactiveというclassをつける
					sp_menu.next().removeClass('visible'); // 自分の兄弟要素にvisibleというclassをつける
					sp_menu.find("span").text("MENU"); // 自分の子要素のテキストを書き換え
					flg = "close"; // flgを「閉じてる」状態にする
					$('body,html').css({ "overflow": "visible", "height": "auto" });//スクロール固定解除
					sp_menu.focus();
				}
			}
		});
	}else{
		// (2)windowの読み込みが完了したときに、1100px以上の場合に行いたいもの
		// header animation
		$(window).scroll(function() {
			if ($(window).scrollTop() > 80) {
				$("#header").addClass("scroll");
			} else {
				$("#header").removeClass("scroll");
			}
		});

	}

	function matchFunction(){
		// (3)windowサイズを変更して、1099px以下になったら発火するイベント
		// ▼トリガーがクリックされたら
		sp_menu.on("click", function () {
			sp_menu_gnavi.toggleClass('on');
			sp_menu.toggleClass('active'); // 自分にactiveというclassをつける
			sp_menu.next().toggleClass('visible'); // 自分の兄弟要素にvisibleというclassをつける
			if (flg == "close") { // flgがcloseだったら
				sp_menu.find("span").text("CLOSE"); // 自分の子要素のテキストを書き換え
				flg = "open"; // flgを「開いてる」状態にする
				$('body,html').css({ "overflow":"hidden","height":"100%" }); //スクロール固定
			} else { // flgがcloseでなかったら
				sp_menu.find("span").text("MENU"); // 自分の子要素のテキストを書き換え
				flg = "close"; // flgを「閉じてる」状態にする
				$('body,html').css({ "overflow":"visible","height":"auto" });//スクロール固定解除
			}
		});
		// ▼トリガーフォーカス時にキーボードが押されたら
		sp_menu.on("keyup", function (e) {
			if (e.keyCode == 13) { //それがエンターキーだったら
				sp_menu_gnavi.toggleClass('on');
				sp_menu.toggleClass('active'); // 自分にactiveというclassをつける
				sp_menu.next().toggleClass('visible'); // 自分の兄弟要素にvisibleというclassをつける

				if (flg == "close") { // flgがcloseだったら
					sp_menu.find("span").text("CLOSE"); // 自分の子要素のテキストを書き換え
					flg = "open"; // flgを「開いてる」状態にする
					$('body,html').css({ "overflow":"hidden","height":"100%" }); //スクロール固定
				} else { // flgがcloseでなかったら
					sp_menu.find("span").text("MENU"); // 自分の子要素のテキストを書き換え
					flg = "close"; // flgを「閉じてる」状態にする
					$('body,html').css({ "overflow":"visible","height":"auto" });//スクロール固定解除
				}
			} else if (e.keyCode == 27) { //それがエスケープーキーだったら
				if (flg == "open") { // flgがopenだったら
					sp_menu_gnavi.removeClass('on');
					sp_menu.removeClass('active'); // 自分にactiveというclassをつける
					sp_menu.next().removeClass('visible'); // 自分の兄弟要素にvisibleというclassをつける
					sp_menu.find("span").text("MENU"); // 自分の子要素のテキストを書き換え
					flg = "close"; // flgを「閉じてる」状態にする
					$('body,html').css({ "overflow":"visible","height":"auto" });//スクロール固定解除
				}
			}
		});
		// ▼トリガー以外にフォーカスされている時キーボードが押されたら
		$(document).on("keyup", function (e) {
			if (e.keyCode == 27) { //それがエスケープーキーだったら
				if (flg == "open") { // flgがopenだったら
					sp_menu_gnavi.removeClass('on');
					sp_menu.removeClass('active'); // 自分にactiveというclassをつける
					sp_menu.next().removeClass('visible'); // 自分の兄弟要素にvisibleというclassをつける
					sp_menu.find("span").text("MENU"); // 自分の子要素のテキストを書き換え
					flg = "close"; // flgを「閉じてる」状態にする
					$('body,html').css({ "overflow": "visible", "height": "auto" });//スクロール固定解除
					sp_menu.focus();
				}
			}
		});

		if (window.matchMedia("(min-width:1100px)").matches) {
			// (4)windowサイズを変更して、1100px以上になったら発火するイベント
			// header animation
			$(window).scroll(function() {
				if ($(window).scrollTop() > 80) {
					$("#header").addClass("scroll");
				} else {
					$("#header").removeClass("scroll");
				}
			});
		}
	}
	window.matchMedia("(max-width:1100px)").addListener(matchFunction);

});

/* ==========================================================
!rollover
========================================================== */
var rollover = function(){
	var suffix = { normal : '_no.', over   : '_on.'};
	$('a.over, img.over, input.over').each(function(){
		var a = null;
		var img = null;

		var elem = $(this).get(0);
		if( elem.nodeName.toLowerCase() == 'a' ){
			a = $(this);
			img = $('img',this);
		}else if( elem.nodeName.toLowerCase() == 'img' || elem.nodeName.toLowerCase() == 'input' ){
			img = $(this);
		}

		var src_no = img.attr('src');
		var src_on = src_no.replace(suffix.normal, suffix.over);

		if( elem.nodeName.toLowerCase() == 'a' ){
			a.bind("mouseover focus",function(){ img.attr('src',src_on); })
			 .bind("mouseout blur",  function(){ img.attr('src',src_no); });
		}else if( elem.nodeName.toLowerCase() == 'img' ){
			img.bind("mouseover",function(){ img.attr('src',src_on); })
			   .bind("mouseout", function(){ img.attr('src',src_no); });
		}else if( elem.nodeName.toLowerCase() == 'input' ){
			img.bind("mouseover focus",function(){ img.attr('src',src_on); })
			   .bind("mouseout blur",  function(){ img.attr('src',src_no); });
		}

		var cacheimg = document.createElement('img');
		cacheimg.src = src_on;
	});
};
/* ==========================================================
!pageTop
========================================================== */
var pageTop = function(){
	$(".pagetop").click(function() {
		$("html, body").animate({scrollTop: 0}, 1000, 'easeInOutCubic');
		return false;
	});
};
/* ==========================================================
!fixed pagetop scroll
========================================================== */
var pageTopFixed = function(){
	var pageTopBox = $(".pagetop_fixed");
	var pageTopLink = $(".pagetop_fixed p");

	pageTopLink.click(function() {
		$("html, body").animate({scrollTop: 0}, 1000, 'easeInOutCubic');
		return false;
	});

	$(window).bind("scroll", function() {
		if ($(this).scrollTop() > 150) {
			pageTopBox.fadeIn();
		} else {
			pageTopBox.fadeOut();
		}

		scrollHeight = $(document).height();
		scrollPosition = $(window).height() + $(window).scrollTop();
		footHeight = $("#footer").innerHeight();
		if ( scrollHeight - scrollPosition  <= footHeight ) {
			pageTopLink.css({"position":"absolute","bottom": "0px"});
		} else {
			pageTopLink.css({"position":"fixed","bottom": "0px"});
		}
	});
};
/* ==========================================================
!pageScroll
========================================================== */
var pageScroll = function(){
	jQuery.easing.easeInOutCubic = function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	};
	$("a[href*='#'], .scroll").click(function(){
		$('html, body').animate({
			scrollTop: $($.attr(this, 'href') ).offset().top - 80 // - 70 等といれるとそのピクセル数分増えた状態でスクロールが止まる(ヘッダー固定の時に利用)
		}, 500);
	});
};
/* ==========================================================
!Accordion
========================================================== */
var Accordion = (function(){
	var accordion01 = $(".accordion dt");
	accordion01.on("click", function() {
	$(this).next().slideToggle();
	});
});
/* ==========================================================
!tab
========================================================== */
var tabMenu = (function(){
	var tabLink = $("#tab_link li a");
	tabLink.on("click", function() {
		$("#tab_contents > div").hide();
		$($(this).attr("href")).fadeToggle();
	});
});
