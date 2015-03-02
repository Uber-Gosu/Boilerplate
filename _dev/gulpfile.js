
/* Windows backslash issue
**************************************************/
var processWinPath = function(file) {
  var path = require('path');
  if (process.platform === 'win32') {
    file.path = path.relative('.', file.path);
    file.path = file.path.replace(/\\/g, '/');
  }
};

/* Dependencies
**************************************************/
var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps'),
    livereload = require('gulp-livereload');

/* JS
**************************************************/
gulp.task('scripts', function() {
    return gulp.src([
        'js/plugins/console_fix.js',
        'js/plugins/jquery.easing-1.3.js',
        'js/plugins/selectivizr-min.js',
        'js/plugins/*.js',
        'js/scripts.js',
        'js/*.js',
        ])
        .pipe(sourcemaps.init())
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('../js'))
        .pipe(rename('scripts.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest('../js'));
});

/* WATCHER
**************************************************/
gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('js/**/*.js', ['scripts']);
    gulp.watch('../css/styles.min.css').on('change', livereload.changed);
});

/* RUN SHORTCUT
**************************************************/
gulp.task('default', ['watch']);