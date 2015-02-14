/*------------------------------------*\
	Packages
\*------------------------------------*/

module.exports = gulp;

/**
 * $ is an object generated by the dependencies in package.json
 */
var gulp =			require('gulp'),
	browserSync =	require('browser-sync'),
	reload =		browserSync.reload,
	$ =				require('gulp-load-plugins')();






/*------------------------------------*\
	BROWSER SYNC
\*------------------------------------*/

gulp.task('browser-sync', function() {
	browserSync({
		proxy: 'localhost/starter',
		notify: false
	});
});






/*------------------------------------*\
	CSS
\*------------------------------------*/

gulp.task('sass', function() {
	
	return $.rubySass('css/global.scss', { sourcemap: true }) 
		.pipe($.plumber())
		.on('error', function (err) {
			console.error('Error!', err.message);
		})
		.pipe($.sourcemaps.write())
		.pipe($.autoprefixer('last 2 versions'))
		.pipe(gulp.dest('css'))
        .pipe(reload({stream:true}));	

});


/**
 * Production.min.css
 */
gulp.task('css', ['sass'], function(){

	gulp.src([
			'css/normalize.css',
			'css/global.css'
		])
		.pipe($.plumber())
		.pipe($.concat('production.min.css'))
		.pipe($.minifyCss())
		.pipe(gulp.dest('dist'));


});





/*------------------------------------*\
	JS
\*------------------------------------*/

/**
 * Lint the main js file. jshint-stylish provides nice output
 */
gulp.task('lint', function() {

	return gulp.src('js/main.js')
		.pipe($.jshint())
		.pipe($.jshint.reporter('jshint-stylish'));

});


/**
 * Build Production.min.js
 */
gulp.task('js', ['lint'], function(){

	return gulp.src('js/*.js')
		.pipe($.plumber())
		.pipe($.concat('production.min.js'))
		.pipe($.uglify())
		.pipe(gulp.dest('dist'))
        .pipe(reload({stream:true}));

});





/*------------------------------------*\
	Watch
\*------------------------------------*/

gulp.task('watch', ['default'], function() {

	$.watch('css/**/*.scss', function () {
		gulp.start('css');
	});

	$.watch('js/*.js', function () {
		gulp.start('js');
	});

	$.watch('*.html', function () {
		gulp.src('*.html')
			.pipe(reload({stream:true}));
	});

});





/*------------------------------------*\
	Default
\*------------------------------------*/

gulp.task('default', ['css', 'js', 'browser-sync']);

