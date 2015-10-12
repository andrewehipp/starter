module.exports = gulp;





/**
 * Packages
 *
 * '$' is an object generated by the devDependencies in package.json. If needed,
 * console.log($) can be used to check $'s so long as 'lazy: false' is set.
 */

var gulp =  require('gulp'),
    $ =     require('gulp-load-plugins')({
                pattern: '*',
                replaceString: /\bgulp[\-.]/
            });





/**
 * ASSET PATHS
 *
 * Object that contains paths for all asset types. Usefull for changing build
 * enviornments.
 */

var PATH = {
    css:   './css',
    js:    './js',
    img:   './img',
    fonts: './fonts',
    dist:  './dist'
};





/**
 * Browsersync (http://www.browsersync.io/docs/api/)
 */

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





/**
 * SCSS Linting
 */

gulp.task('scss-lint', function() {

    gulp.src(PATH.css + '/**/*.scss')
        .pipe($.plumber())
        .pipe($.scssLint({
            'config': './scss-lint.yml'
        }))

});


/**
 * Compile SCSS
 */

gulp.task('sass', ['scss-lint'], function() {

    return gulp.src(PATH.css + '/**/*.scss')
        .pipe($.plumber())
        .pipe($.sourcemaps.init())
        .pipe($.sass({
            onError: function(err) {
                return $.notify().write(err);
            }
        }))

        // Inline images as base64 into the css
        .pipe($.inlineBase64({
            baseDir: PATH.css,
            maxSize: 1024 * 12, // 12kb
            debug: false // Debug output in the console
        }))
        .pipe($.sourcemaps.write())
        .pipe($.autoprefixer('last 2 versions'))
        .pipe(gulp.dest(PATH.css))
        .pipe($.browserSync.reload(
            {stream:true}
        ));

});


/**
 * Build Production.min.css
 */

gulp.task('css', ['sass'], function(){

    gulp.src([
            PATH.css + '/normalize.css',
            PATH.css + '/global.css'
        ])
        .pipe($.plumber())
        .pipe($.concat('production.min.css'))
        .pipe($.minifyCss())
        .pipe(gulp.dest(PATH.dist));

});





/**
 * Lint the main js file. jshint-stylish provides nice output
 */

gulp.task('lint', function() {

    return gulp.src(PATH.js + '/main.js')
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'));

});

/**
 * JavaScript Code Style (http://jscs.info/rules.html)
 */

gulp.task('jscs', ['lint'], function() {

    return gulp.src(PATH.js + '/main.js')
        .pipe($.jscs({
            verbose: true
        }));

});


/**
 * Build Production.min.js
 */

gulp.task('js', ['jscs'], function(){

    return gulp.src(PATH.js + '/*.js')
        .pipe($.plumber())
        .pipe($.concat('production.min.js'))
        .pipe($.uglify())
        .pipe(gulp.dest(PATH.dist))
        .pipe($.browserSync.reload(
            {stream:true}
        ));

});





/**
 * Sassdoc
 */

gulp.task('sassdoc', function() {

    return gulp.src(PATH.css + '/**/*.scss')
        .pipe($.sassdoc());

});





/**
 * Watch for changes
 */

gulp.task('watch', ['default'], function() {

    $.watch(PATH.css + '/**/*.scss', function() {
        gulp.start('css');
    });

    $.watch(PATH.js + '/*.js', function() {
        gulp.start('js');
    });

    $.watch('*.html', function() {
        gulp.src('*.html')
            .pipe($.browserSync.reload(
                {stream:true}
            ));
    });

});




/**
 * Default
 */

gulp.task('default', ['css', 'js', 'browser-sync']);
