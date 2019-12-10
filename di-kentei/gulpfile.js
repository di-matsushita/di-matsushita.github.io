/* 【Read Me】

gulp-watchで監視しつつ各種パッケージが処理されるよう指定しているので
cmdやターミナルで動かすときは

[code]
cd 案件フォルダ
gulp
[/code]

でgulpを実行して下さい

説明：
「cd 案件フォルダ」：案件フォルダに移動
「gulp」：デフォルトのタスクを動かしてから保存するたびにタスクが動いてくれるよう常に監視させるタスクを実行

*/

/* ディレクトリ設定
++++++++++++++++++++++++++++++++++++++++++++++++++ */
var publicDir    = 'public/';       // 公開ディレクトリ（public/がサーバーのドキュメントルートと同義）
var assetsDir    = 'common/';       // 直下ディレクトリ（「common/」「cmn/」「」等案件によって自由に設定できるように）
var imageDir     = 'img/';          // クライアント指定の画像を格納するフォルダ名（「img」「image」「images」）
var styleDir     = 'css/';          // クライアント指定のCSSを格納するフォルダ名（「css」「style」「styles」）
/* ++++++++++++++++++++++++++++++++++++++++++++++++++ */

/* ディレクトリ設定(変更禁止)
++++++++++++++++++++++++++++++++++++++++++++++++++ */
var resourceDir  = 'resource/';     // gulp監視対象用ディレクトリ（変更時に下部の設定に書くの面倒なので）
var temporaryDir = 'temporary/';    // 一時置き場用ディレクトリ（cssCombしたscssを吐き出すためのディレクトリ）
var sourcemapDir = '../../../map/'; // ソースマップディレクトリ(sourcemaps.writeは「publicDir + assetsDir + styleDir」を見ているよ)

/* sassファイル並べ替え設定
++++++++++++++++++++++++++++++++++++++++++++++++++ */
//【resource（gulp監視対象用ディレクトリ）】
var resource = {
	scssDir: resourceDir + 'sass/',
	scss   : resourceDir + 'sass/**/*.scss'
};

//【temporary（一時置き場用ディレクトリ）】
var temporary = {
	scssDir: temporaryDir + 'sass/',
	scss   : temporaryDir + 'sass/**/*.scss'
};

//【public（吐き出し先用ディレクトリ）】
var public = {
	cssDir: publicDir + assetsDir + styleDir,
};

/* ディレクトリマップ
++++++++++++++++++++++++++++++++++++++++++++++++++
[repository]：ローカルリポジトリ
    │
    ├[public]：吐き出し先用ディレクトリ
    │    ├[common]
    │    │    ├[css]：resourceディレクトリで作業したファイルがここに吐き出されます
    │    │    ├[img]：resourceディレクトリで作業したファイルがここに吐き出されます
    │    │    └[js]
    │    │
    │    └index.html
    │
    ├[map]：ソースマップディレクトリ
    │
    ├[node_modules]：プラグインディレクトリ
    │
    ├[resource]：gulp監視対象用ディレクトリ
    │    ├[img]
    │    └[sass]
    │          ├[setting]
    │          │    ├cmn_layoutのパーシャルファイル
    │          │    ├_mixin.scss
    │          │    └_variable.scss
    │          │
    │          ├cmn_layout.scss
    │          ├cmn_style.scss
    │          └import.scss
    │
    ├[temporary]：一時置き場用ディレクトリ（sassファイル並べ替え用）
    │    └[sass]
    │          ├[setting]
    │          │    ├cmn_layoutのパーシャルファイル
    │          │    ├_mixin.scss
    │          │    └_variable.scss
    │          │
    │          ├cmn_layout.scss
    │          ├cmn_style.scss
    │          └import.scss
    │
    ├.csscomb.json：プロパティの並び順やインデントなどの指示
    ├.gitignore：gitにコミットしないファイルを記載
    ├gulpfile.js：このファイル
    └package.json：プラグインインストールの指示

 */

/* 使用するプラグインの定義
++++++++++++++++++++++++++++++++++++++++++++++++++ */
var gulp           = require('gulp');                  // gulp
var sass           = require('gulp-sass');             // sass
var sourcemaps     = require("gulp-sourcemaps");       // ブラウザでscssファイルの何行目に書かれているかがわかるように
var changedInPlace = require('gulp-changed-in-place'); // ファイルが更新されている場合のみコピーする（無限ループ防止）
var csscomb        = require('gulp-csscomb');          // CSSのプロパティを並び替え（並び替え順は.csscomb.jsonで指定）
var autoPrefixer   = require('gulp-autoprefixer');     // Can I Useを使用して、ブラウザーのベンダープリフィックスを自動付与
	//if node version is lower than v.0.1.2 （Node.jsのバージョンが、0.1.2より古い場合用）
	require('es6-promise').polyfill();
var imageMin       = require('gulp-imagemin');         // 画像圧縮
var pngquant       = require('imagemin-pngquant');     // 画像圧縮
var mozjpeg        = require('imagemin-mozjpeg');      // 画像圧縮
var cache          = require('gulp-cached');           // 変更された分だけを処理
var plumber        = require('gulp-plumber');          // エラーが原因でタスクが強制停止することを防止
var notify         = require('gulp-notify');           // タスクが終了した際などにデスクトップ上で通知
var watch          = require('gulp-watch');            // ファイルの更新を監視だけではなくファイルの追加も監視対象に含める
var runSequence    = require('run-sequence');          // gulp で同期的処理を行う
var browserSync    = require("browser-sync");          // ローカルサーバー起動
var ssi            = require('browsersync-ssi');       // ローカルサーバーSSI動作

/* browserSync用Proxy設定（テストURLの指定）
++++++++++++++++++++++++++++++++++++++++++++++++++ */
var testURL      = 'http://localhost/'; // これを使用する際はMAMP等でローカルサーバーを起動してください

/* ローカルサーバーで確認する　確認URL：http://lochal:3000/ 等 ポートは指定した数値に
++++++++++++++++++++++++++++++++++++++++++++++++++ */
gulp.task('localserver', function(){
	browserSync({
		// server: {
		// 	// ルートパスの指定（browserSyncのサーバを使うときはコチラ）
		// 	baseDir: publicDir,
		// },
		// テストサーバーでチェック(MAMPを使用する場合はコチラ)
		proxy: testURL,
		// インデックスファイル
		index : "index.html",
		// gulp起動時に開くページ
		startPath: '/',
		// ポートを指定（10単位で指定 複数案件で確認しているときに デフォルトは3000）
		port: 3000,
		// External IPでブラウザを開く（同じLANに繋がったスマホで確認する時に重宝 PCはhostsの設定が必要かも）
		open: "external",
	});
});
gulp.task('browserSync', function(){
	browserSync.init({
		notify: false,
		startPath: '/',
		server: {
			baseDir: publicDir,
			middleware: [
				ssi({baseDir: publicDir, ext: '.html'})
			]
		}
	});
});

/* 自動リロード
++++++++++++++++++++++++++++++++++++++++++++++++++ */
gulp.task('browserSyncReload', function () {
	browserSync.reload();
});

/* 出力設定（sassは非同期処理）
++++++++++++++++++++++++++++++++++++++++++++++++++ */
// 【temporary（一時置き場のディレクトリ）】にcssCombしたscssを吐き出し
gulp.task('csscomb', function() {
	return gulp.src(resource.scss)
		.pipe(plumber({errorHandler: notify.onError('<%= error.message %>')})) //強制停止を防止しつつエラー時はデスクトップに通知を出す
		.pipe(csscomb()) //sass側のCSSプロパティを並び替える
		.pipe(changedInPlace({firstPass: true})) //ファイルが更新されている場合のみコピー（無限ループ防止）
		.pipe(gulp.dest(temporary.scssDir)); //【temporary（一時置き場用ディレクトリ）】側のscssフォルダに吐き出す
});

// 【temporary（一時置き場のディレクトリ）】から【resource（ソースのディレクトリ）】へと整えられたscssをコピー
gulp.task('moveCombedCss', function() {
	return gulp.src(temporary.scss) //変数定義を呼び出し
		.pipe(plumber({errorHandler: notify.onError('<%= error.message %>')})) //強制停止を防止しつつエラー時はデスクトップに通知を出す
		.pipe(changedInPlace({firstPass: true})) //ファイルが更新されている場合のみコピー（無限ループ防止）
		.pipe(gulp.dest(resource.scssDir)); //【resource（gulp監視対象用ディレクトリ）】側のscssフォルダに吐き出す
});

// 【temporary（一時置き場用ディレクトリ）】から【public（吐き出し先用ディレクトリ）】へコンパイル Sassのコンパイル
gulp.task('sass', function(){
	return gulp.src(temporary.scss) //変数定義を呼び出し
		.pipe(plumber({errorHandler: notify.onError('<%= error.message %>')})) //強制停止を防止しつつエラー時はデスクトップに通知を出す
		.pipe(sourcemaps.init()) //ソースマップを作成
		.pipe(sass({
				outputStyle: 'expanded', //gulp-sassでのインデントはいつものままに
				css: public.cssDir, //cssは吐き出し先用のcssディレクトリに
				sass: temporary.scssDir //scssは一時置き場用のscssディレクトリに
			})
			.on('error', sass.logError))
		.pipe(csscomb()) //(1)CSSプロパティ並び替えてインデントなどキレイにしてから
		.pipe(autoPrefixer({ browsers: ['last 4 versions', 'ie >= 10', 'android >= 5'] })) //(2)ベンダープリフィックスを付与する　ブラウザの指定がある場合は{}の中身を変更　メジャーバージョンの場合は不要なので削除
		.pipe(sourcemaps.write(sourcemapDir)) //ソースマップの保存場所を指定（必ずsourcemaps.initから離すこと）
		.pipe(gulp.dest(public.cssDir)) //【public（吐き出し先用ディレクトリ）】側のcssフォルダに吐き出す
		.pipe(browserSync.reload({stream:true})) //ローカルサーバ更新
});

/* 出力設定（その他は同期処理）
++++++++++++++++++++++++++++++++++++++++++++++++++ */
// imageの出力設定と画像圧縮
gulp.task('image', function(){
	gulp.src([resourceDir + 'img/**/*']) //作業フォルダ
		.pipe(plumber({errorHandler: notify.onError('<%= error.message %>')})) //強制停止を防止しつつエラー時はデスクトップに通知を出す
		.pipe(imageMin({use: [
			pngquant({
				speed: 1,
				floyd:0
			}),
			mozjpeg({
				quality:85,
				progressive: true
			})
			,
			imageMin.svgo(),
			imageMin.optipng(),
			imageMin.gifsicle()
		]}))
		.pipe(gulp.dest(publicDir + assetsDir + imageDir)) //吐き出し先用ディレクトリ側のimgフォルダに吐き出す
});

/* gulp-watchで監視しつつ各種パッケージが処理されるよう指定
++++++++++++++++++++++++++++++++++++++++++++++++++ */
gulp.task('watch',["localserver"], function(){
	//sass+cssのコンパイル
	watch(resource.scss, function(event){ gulp.start('csscomb')});
	watch(temporary.scss, function(event){ gulp.start('sass')});
});

/* デフォルトタスクでgulp-watchも動くよう指定
++++++++++++++++++++++++++++++++++++++++++++++++++ */
gulp.task('default', function(callback) {
	runSequence('csscomb', 'sass', 'watch', callback);
});

/* ビルド時専用のタスク
++++++++++++++++++++++++++++++++++++++++++++++++++ */
/* 開発環境のscssプロパティを並び替える */
gulp.task('comb', function(callback) {
	runSequence('csscomb', 'moveCombedCss', callback);
});

/* 共同作業時に他者がやった作業をローカルへ反映させる */
gulp.task('build', function(callback) {
	runSequence('csscomb', 'moveCombedCss', 'sass', 'image', callback);
});
