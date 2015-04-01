module.exports = gulp;


/*------------------------------------*\
    Packages
\*------------------------------------*/

/**
 * '$' is an object generated by the devDependencies in package.json. If needed,
 * console.log($) can be used to check $'s so long as 'lazy: false' is set.
 */
var gulp =  require('gulp'),
    $ =     require('gulp-load-plugins')({
                pattern: '*',
                replaceString: /\bgulp[\-.]/
            });

/**
 * Object that contains paths for all asset types. Usefull for changing build
 * enviornments.
 */
var path = {
        css:   './css',
        js:    './js',
        img:   './img',
        fonts: './fonts',
        dist:  './dist'
    };



/*------------------------------------*\
    BROWSER SYNC
\*------------------------------------*/

gulp.task('browser-sync', function() {

    $.browserSync({
        proxy: 'localhost/starter',
        notify: false,
        ui: {
            weinre: {
                port: 9090
            }
        }
    });

});





/*------------------------------------*\
    CSS
\*------------------------------------*/

gulp.task('sass', function() {

    return gulp.src(path.css + '/**/*.scss')
        .pipe($.plumber())
        .pipe($.sourcemaps.init())
        .pipe($.sass({
            onError: function(err) {
                return $.notify().write(err);
            }
        }))
        .pipe($.sourcemaps.write())
        .pipe($.autoprefixer('last 2 versions'))
        .pipe(gulp.dest('css'))
        .pipe($.browserSync.reload(
            {stream:true}
        ));

});


/**
 * Production.min.css
 */
gulp.task('css', ['sass'], function(){

    gulp.src([
            path.css + '/global.css'
        ])
        .pipe($.plumber())
        .pipe($.concat('production.min.css'))
        .pipe($.minifyCss())
        .pipe(gulp.dest(path.dist));

});





/*------------------------------------*\
    JS
\*------------------------------------*/

/**
 * Lint the main js file. jshint-stylish provides nice output
 */
gulp.task('lint', function() {

    return gulp.src(path.js + '/main.js')
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'));

});


/**
 * Build Production.min.js
 */
gulp.task('js', ['lint'], function(){

    return gulp.src(path.js + '/*.js')
        .pipe($.plumber())
        .pipe($.concat('production.min.js'))
        .pipe($.uglify())
        .pipe(gulp.dest(path.dist))
        .pipe($.browserSync.reload(
            {stream:true}
        ));

});





/*------------------------------------*\
      SASSDOC
\*------------------------------------*/

gulp.task('sassdoc', function() {

    return gulp.src(path.css + '/**/*.scss')
        .pipe($.sassdoc());

});





/*------------------------------------*\
    WATCH
\*------------------------------------*/

gulp.task('watch', ['default'], function() {

    $.watch(path.css + '/**/*.scss', function() {
        gulp.start('css');
    });

    $.watch(path.js + '/*.js', function() {
        gulp.start('js');
    });

    $.watch('*.html', function() {
        gulp.src('*.html')
            .pipe($.browserSync.reload(
                {stream:true}
            ));
    });

});





/*------------------------------------*\
    DEFAULT
\*------------------------------------*/

gulp.task('default', ['css', 'js', 'browser-sync']);
