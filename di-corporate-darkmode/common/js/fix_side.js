/*
 * fix_side.js
 */

jQuery(document).ready(function($) {
	/* PCのみside固定
	------------------------------------ */
		if(window.matchMedia("(min-width:1020px)").matches){
			$(function(){
				var fix = $("#fix_side ul");
				var fixTop = fix.offset().top - 80; //sideの縦座標を格納
				var boxTop = [];
				var current = -1;

				// 各sectionの位置を入れる
				$(".inner02>section").each(function (i) {
					boxTop[i] = $(this).offset().top - 300;
				});
				changeBox(0);
				//スクロールした時のsection位置
				$(window).scroll(function(){
					for (var i = boxTop.length - 1 ; i >= 0; i--) {
						if ($(window).scrollTop() > boxTop[i]) {
							changeBox(i);
							break;
						}
					}
				});
				//sideナビの現在地表示
				function changeBox(secNum) {
					if (secNum != current) {
						current = secNum;
						secNum2 = secNum + 1;//HTML順序用
						$("#fix_side ul li").removeClass("current");
						$("#fix_side ul li:nth-child(" + secNum2 +")").addClass("current");
					}
				}
				//side固定
				$(window).scroll(function () {
					//スクロール時の縦座標がsideの縦座標以上の場合
					if($(window).scrollTop() >= fixTop) {
						fix.css("position","fixed");
						fix.css("top","80px");
					} else {
						fix.css("position","static");
						fix.css("top","");
					}
				});
			});
		}

});
