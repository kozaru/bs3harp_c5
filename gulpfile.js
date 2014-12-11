var gulp = require('gulp');
var copy = require('gulp-copy');
var prettify = require('gulp-html-prettify');
var imagemin = require('gulp-imagemin');
var newer = require('gulp-newer');
var runSequence = require('run-sequence');

var config = {
  'sourceMinify': './www/html/',
  'sourceMinifyHTML': './www/html/*.html',
  'sourceHTML': './www/html/**',
  'sourceCSS': './www/css/**',
  'sourceJS': './www/js/**',
  'sourceIMG': './www/images/**',
  'distHTML': '../html/',
  'distCSS': '../css/',
  'distJS': '../js/',
  'distIMG': '../images/',
  'bsLESS': './bower/bootstrap/less/**',
  'bsJS': './bower/bootstrap/dist/js/bootstrap.js',
  'bsJSmin': './bower/bootstrap/dist/js/bootstrap.min.js',
  'bsJQUERY': './bower/jquery/dist/**',
  'publicLESS': './public/css/_bs/',
  'publicJS': './public/js/'
}

gulp.task('bsless', function() {
  return gulp.src(config.bsLESS)
  .pipe(gulp.dest(config.publicLESS));
});

gulp.task('bsjs', function() {
  return gulp.src(config.bsJS)
  .pipe(gulp.dest(config.publicJS));
});

gulp.task('bsjquery', function() {
  return gulp.src(config.bsJQUERY)
  .pipe(gulp.dest(config.publicJS));
});

gulp.task('bs', function() {
  runSequence(
    'bsless',
    'bsjs',
    'bsjquery'
    );
});

gulp.task('copyhtml', function() {
  return gulp.src(config.sourceHTML)
  .pipe(gulp.dest(config.distHTML));
});

gulp.task('copycss', function() {
  return gulp.src(config.sourceCSS)
  .pipe(gulp.dest(config.distCSS));
});

gulp.task('copyjs', function() {
  return gulp.src(config.sourceJS)
  .pipe(gulp.dest(config.distJS));
});

gulp.task('copyimg', function() {
  return gulp.src(config.sourceIMG)
    .pipe(newer(config.distIMG))
    .pipe(imagemin({
      optimizationLevel: 3
    })) // See gulp-imagemin page.
    .pipe(gulp.dest(config.distIMG));
});

gulp.task('copy', function() {
  runSequence(
    'copyhtml',
    'copycss',
    'copyjs',
    'copyimg'
    );
});

gulp.task('pretty', function() {
  return gulp.src(config.sourceMinifyHTML)
  .pipe(prettify({
    indent_char: ' ',
    indent_size: 2
  }))
  .pipe(gulp.dest(config.sourceMinify));
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
