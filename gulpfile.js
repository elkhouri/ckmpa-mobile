var gulp = require('gulp');
var gutil = require('gulp-util');
var notify = require('gulp-notify');
var sass = require('gulp-ruby-sass');
var autoprefix = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css')
var plumber = require('gulp-plumber');
var ls = require('gulp-livescript');
var livereload = require('gulp-livereload');
var lr = require('tiny-lr')
var server = lr();
server.listen(35729);

// Where do you store your Sass files?
var sassDir = 'sass';
 
// Which directory should Sass compile to?
var targetCSSDir = 'www/css';
 
// Where do you store your CoffeeScript files?
var lsDir = 'livescript';

// Which directory should CoffeeScript compile to?
var targetJSDir = 'www/js';
 
var htmlDir = 'www/templates';

// Compile Sass, autoprefix CSS3,
// and save to target CSS directory
gulp.task('css', function () {
    return gulp.src(sassDir + '/main.sass')
        .pipe(sass({ style: 'compressed' }).on('error', gutil.log))
        .pipe(autoprefix('last 10 version'))
        .pipe(gulp.dest(targetCSSDir))
        .pipe(notify('CSS minified'))
});

gulp.task('js', function () {
    return gulp.src(lsDir + '/**/*.ls')
        .pipe(plumber())
        .pipe(ls({bare: true}).on('error', gutil.log).on("error", notify.onError()))
        .pipe(gulp.dest(targetJSDir))
});

gulp.task('html', function () {
    return gulp.src(htmlDir + '/**/*.html')
        .pipe(livereload(server));
})
 
 
// Keep an eye on Sass, Coffee, and PHP files for changes...
gulp.task('watch', function () {
    //gulp.watch(sassDir + '/**/*.sass', ['css']);
    gulp.watch(lsDir + '/**/*.ls', ['js']);
    gulp.watch(htmlDir + '/**/*.html', ['html']);
});
 
// What tasks does running gulp trigger?
gulp.task('default', ['js', 'watch']);