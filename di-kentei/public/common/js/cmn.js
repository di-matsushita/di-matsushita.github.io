/*
 * cmn.js
 */

jQuery(document).ready(function($) {
/* ==========================================================
!stack
========================================================== */
/* 関数の読み込み
------------------------------------ */
	pageTop();
	pageTopFixed();
	pageScroll();
	Accordion();
	tabMenu();
	scrollAnimation();

/* ==========================================================
!外部JS(プラグイン)の個別記述はここに記述する
========================================================== */
/* matchHeight
------------------------------------ */
	$('.height').matchHeight();

/* object-fit
------------------------------------ */
	objectFitImages('img.object-fit-img');

/* colorbox
------------------------------------ */
	$(".colorbox").colorbox({
		inline: true,
		fixed: true,
		width:"90%",

		//背景をスクロールさせないように
		onOpen: function() {
	    	var ycoord = $(window).scrollTop();
	    	$('#box_colorbox').data('ycoord',ycoord);
	    	ycoord = ycoord * -1;
	    	$('body').css('position','fixed').css('left','0px').css('right','0px').css('top',ycoord + 'px');
	  	},
	  	onClosed: function() {
	    	$('body').css('position','').css('left','auto').css('right','auto').css('top','auto');
	    	$(window).scrollTop($('#box_colorbox').data('ycoord'));
	  	}
	});

/* window.matchMedia
------------------------------------ */
	var sp_menu_gnavi = $("#gnavi"); // クリック判定
	var sp_menu = $("#gnavi .menu_trigger"); // class用
	var flg = "close"; // フラグ判定用 初期は「閉じてる」

	if(window.matchMedia("(max-width:767px)").matches){
		// (1)windowの読み込みが完了したときに、767px以下の場合に行いたいもの

		// ハンバーガーメニュー
		sp_menu_gnavi.on("click keyup", function() { // トリガーがクリックされたら
			sp_menu_gnavi.toggleClass('on');
			sp_menu.toggleClass('active'); // 自分にactiveというclassをつける
			sp_menu.next().toggleClass('visible'); // 自分の兄弟要素にvisibleというclassをつける
			if(flg == "close"){ // flgがcloseだったら
				sp_menu.children().text("CLOSE"); // 自分の子要素のテキストを書き換え
				flg = "open"; // flgを「開いてる」状態にする
				$('body,html').css({"overflow":"hidden","height":"100%"}); //スクロール固定
			}else{ // flgがcloseでなかったら
				sp_menu.children().text("MENU"); // 自分の子要素のテキストを書き換え
				flg = "close"; // flgを「閉じてる」状態にする
				$('body,html').css({"overflow":"visible","height":"auto"});//スクロール固定解除
			}
		});


	}else{
		// (2)windowの読み込みが完了したときに、768px以上の場合に行いたいもの

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
		// (3)windowサイズを変更して、767px以下になったら発火するイベント

		// ハンバーガーメニュー
		sp_menu_gnavi.on("click keyup", function() { // トリガーがクリックされたら
			sp_menu_gnavi.toggleClass('on');
			sp_menu.toggleClass('active'); // 自分にactiveというclassをつける
			sp_menu.next().toggleClass('visible'); // 自分の兄弟要素にvisibleというclassをつける
			if(flg == "close"){ // flgがcloseだったら
				sp_menu.children().text("CLOSE"); // 自分の子要素のテキストを書き換え
				flg = "open"; // flgを「開いてる」状態にする
			}else{ // flgがcloseでなかったら
				sp_menu.children().text("MENU"); // 自分の子要素のテキストを書き換え
				flg = "close"; // flgを「閉じてる」状態にする
			}
		});

		if(window.matchMedia("(min-width:768px)").matches){
			// (4)windowサイズを変更して、768px以上になったら発火するイベント

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
	window.matchMedia("(max-width:768px)").addListener(matchFunction);

/* 外部プラグインの読み込みここまで
------------------------------------ */
});
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

	$(window).on("scroll", function() {
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
	$("a[href*='#']:not('.inline'), .scroll").click(function(){
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

	// クリックしたとき
	accordion01.on("click", function() {
		$(this).toggleClass("active").next().slideToggle();
	});

	// エンターキーを押したとき
	accordion01.on("keyup", function(e){
		if(e.keyCode == 13){
			$(this).toggleClass("active").next().slideToggle();
		}
	})
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
/* ==========================================================
!Scroll Animation
========================================================== */
var scrollAnimation = (function(){
	var AnimTrigger = $('.effect'); //アニメーショントリガー
	var windowHeight = $(window).height(); //ウインドウの高さ

	// ロードした際に可視範囲に入っていたら実行される
	$(window).on('load',function(){
		AnimTrigger.each(function(){
			var imgPos = $(this).offset().top; //「AnimTrigger」の位置

			if (imgPos < windowHeight){
				$(this).addClass("aniOn");
			}
		});
	});

	// スクロールした際に「AnimTrigger」ごとに、以下に記述する内容が実行される
	$(window).scroll(function (){
		var scroll = $(window).scrollTop(); //スクロールした量

		AnimTrigger.each(function(){
			var imgPos = $(this).offset().top; //「AnimTrigger」の位置

			//アニメーションする条件＝「画面の下から1/5まできた時点でアニメーション」
			if (scroll > imgPos - windowHeight + windowHeight/5){ //スクロール量　が次の条件より多いとき　…　条件：トリガーの場所　引く　ウィンドウの高さ　足す　ウィンドウの高さ　割る　5（- windowHeight + windowHeight / 5 なので6/5でなく4/5）
				$(this).addClass("aniOn");
			}
		});
	});
});
