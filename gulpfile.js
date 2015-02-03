var gulp = require('gulp');
var copy = require('gulp-copy');
var prettify = require('gulp-html-prettify');
var imagemin = require('gulp-imagemin');
var newer = require('gulp-newer');
var runSequence = require('run-sequence');
var cssbeautify = require('gulp-cssbeautify');

var config = {
  'sourceMinify': './www/html/',
  'sourceMinifyHTML': './www/html/*.html',
  'sourceHTML': './www/html/**',
  // 'sourcePrettify': './www/css/',
  // 'sourcePrettifyCSS': './www/css/content.css',
  'sourceCSS': './www/css/**',
  'sourceLESS': './public/css/**',
  'sourceJS': './www/js/**',
  'sourceIMG': './www/images/**',
  'distHTML': '../html/',
  'distCSS': '../css/',
  'distLESS': '../gulpless/_less/',
  'distJS': '../js/',
  'distIMG': '../images/',
  'bsLESS': './bower/bootstrap/less/**',
  'bsJS': './bower/bootstrap/dist/js/bootstrap.js',
  'bsJSmin': './bower/bootstrap/dist/js/bootstrap.min.js',
  'bsJQUERY': './bower/jquery/jquery.min.js',
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

gulp.task('bsjsmin', function() {
  return gulp.src(config.bsJSmin)
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

gulp.task('copyless', function() {
  return gulp.src(config.sourceLESS)
  .pipe(gulp.dest(config.distLESS));
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
    'copyless',
    'copyjs',
    'copyimg'
    );
});

gulp.task('htmlprettify', function() {
  return gulp.src(config.sourceMinifyHTML)
  .pipe(prettify({
    indent_char: ' ',
    indent_size: 2
  }))
  .pipe(gulp.dest(config.sourceMinify));
});

// gulp.task('cssprettify', function() {
//   return gulp.src(config.sourcePrettifyCSS)
//     .pipe(cssbeautify({
//         indent: '  ',
//         openbrace: 'separate-line',
//         autosemicolon: true
//     }))
//     .pipe(gulp.dest(config.sourcePrettify));
// });

gulp.task('dist', function() {
  runSequence(
    'htmlprettify',
    // 'cssprettify',
    'copy'
    );
});

gulp.task('watch', function() {
  gulp.watch(config.sourceHTML, ['htmlprettify']);
});

gulp.task('default', ['dist', 'watch']);