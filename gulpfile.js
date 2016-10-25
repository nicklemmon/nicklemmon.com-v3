'use strict';

//////////////////////////
//== Requiring things ==//
//////////////////////////

var gulp = require('gulp');
var clean = require('gulp-clean');
var swig = require('gulp-swig');
var data = require('gulp-data');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var globSass = require('gulp-sass-glob');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var concatJS = require('gulp-concat');
var imageMin = require('gulp-imagemin');
var webP = require('gulp-webp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

//////////////////////////
//== Global variables ==//
//////////////////////////

// Base paths
var base = {
  src: './src/',
  dist: './_dist/'
}

// Sub paths
var path = {
  styles: 'styles/',
  markup: 'markup/',
  js: 'js/',
  data: 'data/',
  images: 'images/'
}

// Get some data
var getJsonData = function(file) {
  return require(base.src + '/data/locals.json');
};


///////////////
//== Tasks ==//
///////////////

// Delete the output directory
gulp.task('clean', function() {
  return gulp.src(base.dist) // delete the output dir
    .pipe(clean());
})

// BrowerSync stuff for a local server and cross-browser refreshing
gulp.task('browser-sync', function() {
    browserSync({
        server: "./_dist",
        port: 1986
    })
})

// Build some pages and such
gulp.task('markup', function() {
  return gulp.src([
    base.src + path.markup + '**/!(_)*.pug' // all pug files are compiled, except those beginning with an '_'
  ])
    .pipe(data(getJsonData))
    .pipe(swig({defaults: { cache: false }}))
    .pipe(pug())
    .pipe(gulp.dest(base.dist))
})

// Glob stuff and spit out some styles
gulp.task('styles', function() {
  return gulp.src([
    !base.src + path.styles + 'style.scss', // skip the main file
    base.src + path.styles + '**/*.scss'
  ])
    .pipe(globSass())
    .pipe(sass())
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest(base.dist + path.styles))
})

// Concat and uglify the JavaScript
gulp.task('scripts', function() {
  return gulp.src([
    base.src + path.js + 'vendor/*.js',
    base.src + path.js + 'base/*.js',
    base.src + path.js + 'modules/*.js'
  ])
    .pipe(concatJS('scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(base.dist + path.js))
})

// Minify images
gulp.task('imageMin', function() {
  return gulp.src(base.src + path.images + '**/*')
    .pipe(imageMin())
    .pipe(gulp.dest(base.dist + path.images))
})

// Make them delicious webPs
gulp.task('webP', function() {
  return gulp.src(base.src + path.images + '**/*')
    .pipe(webP())
    .pipe(gulp.dest(base.dist + path.images))
})

// Run both the minify and webP task, asynchronously
gulp.task('images', ['imageMin', 'webP'])


///////////////////////////////////////
//== Run Those Tasks (IF YOU DARE) ==//
///////////////////////////////////////

// Default task
gulp.task('default', ['clean'], function() {
  gulp.run('markup');
  gulp.run('styles');
  gulp.run('scripts');
  gulp.run('images');
  gulp.run('watch');
})

// Watch task
gulp.task('watch', ['default', 'browser-sync'], function() {
  gulp.watch(base.src + path.js + '**/*.js', ['scripts']).on('change', reload);
  gulp.watch(base.src + path.styles + '**/*.scss', ['styles']).on('change', reload);
  gulp.watch(base.src + path.data + '**/*.json', ['markup']).on('change', reload);
  gulp.watch(base.src + path.markup + '**/*.pug', ['markup']).on('change', reload);
})
