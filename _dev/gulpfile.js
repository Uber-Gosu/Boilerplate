/* windows backslash issue
**************************************************/
var processWinPath = function(file) {
    var path = require('path');
    if (process.platform === 'win32') {
        file.path = path.relative('.', file.path);
        file.path = file.path.replace(/\\/g, '/');
    }
};

/* dependencies
**************************************************/
var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    livereload = require('gulp-livereload');

/* js
**************************************************/
gulp.task('js', function() {
    return gulp.src([
        'js/libs/console_fix.js',
        'js/libs/jquery.easing-1.3.js',
        'js/libs/selectivizr-min.js',
        //'js/libs/*.js',
        'js/modules/*.js',
        'js/scripts.js',
        ])
        .pipe(sourcemaps.init())
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('../js'))
        .pipe(rename('scripts.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest('../js'));
});

/* sass
**************************************************/
gulp.task('scss', function() {
    return gulp.src('scss/styles.scss')
        .on('data', processWinPath)
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compact'}).on('error', sass.logError))
        .pipe(rename('styles.min.css'))
        //.pipe(sourcemaps.write('.', {includeContent: false, sourceRoot: '../css'}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('../css'));      
});

/* watcher & live reload
**************************************************/
gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('js/**/*.js', ['js']);
    gulp.watch('scss/**/*.scss', ['scss']);
    gulp.watch('../css/styles.min.css').on('change', livereload.changed);
});

/* run
**************************************************/
gulp.task('default', ['js', 'scss', 'watch']);
