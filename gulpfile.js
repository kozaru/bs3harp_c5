var gulp = require('gulp');
var copy = require('gulp-copy');
var prettify = require('gulp-html-prettify');
var runSequence = require('run-sequence');

var config = {
  'sourceMinify': './www/html/',
  'sourceMinifyHTML': './www/html/*.html',
  'sourceHTML': './www/html/**',
  'sourceCSS': './www/css/**',
  'sourceJS': './www/js/**',
  'distHTML': '../html/',
  'distCSS': '../css/',
  'distJS': '../js/',
  'bsLESS': './bower/bootstrap/less/**',
  'bsJS': './bower/bootstrap/dist/js/bootstrap.js',
  'bsJSmin': './bower/bootstrap/dist/js/bootstrap.min.js',
  'bsJQUERY': './bower/jquery/dist/**',
  'publicLESS': './css/_bs/',
  'publicJS': './js/'
}

gulp.task('bs', function() {
  gulp.src(config.bsLESS)
  .pipe(gulp.dest(config.publicLESS));
  gulp.src(config.bsJS)
  .pipe(gulp.dest(config.publicJS));
  gulp.src(config.bsJSmin)
  .pipe(gulp.dest(config.publicJS));
  gulp.src(config.bsJQUERY)
  .pipe(gulp.dest(config.publicJS));
});

gulp.task('copy', function() {
  gulp.src(config.sourceHTML)
  .pipe(gulp.dest(config.distHTML));
  gulp.src(config.sourceCSS)
  .pipe(gulp.dest(config.distCSS));
  gulp.src(config.sourceJS)
  .pipe(gulp.dest(config.distJS));
});

gulp.task('pretty', function() {
  return gulp.src(config.sourceMinifyHTML)
  .pipe(prettify({
    indent_char: ' ',
    indent_size: 2
  }))
  .pipe(gulp.dest(config.sourceMinify))
});

gulp.task('dist', function() {
  runSequence(
    'pretty',
    'copy'
    );
});

gulp.task('watch', function() {
  gulp.watch(config.sourceHTML, ['pretty']);
});

gulp.task('default', ['dist', 'watch']);
