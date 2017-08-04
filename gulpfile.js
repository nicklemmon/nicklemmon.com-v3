'use strict';


//////////////////////////
//== Requiring things ==//
//////////////////////////

var gulp = require('gulp'),
    clean = require('gulp-clean'),
    swig = require('gulp-swig'),
    data = require('gulp-data'),
    pug = require('gulp-pug'),
    sass = require('gulp-sass'),
    uncss = require('gulp-uncss'),
    globSass = require('gulp-sass-glob'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    concatJS = require('gulp-concat'),
    imageMin = require('gulp-imagemin'),
    webP = require('gulp-webp'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;


//////////////////////////
//== Global variables ==//
//////////////////////////

// Base paths
var base = {
  src: './src/',
  dist: './public/'
}

// Sub paths
var path = {
  styles: 'styles/',
  markup: 'markup/',
  js: 'js/',
  data: 'data/',
  images: 'images/',
  bower: 'bower_components/'
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
        server: "./public",
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
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest(base.dist + path.styles))
})

// Concat and uglify the JavaScript
gulp.task('scripts', function() {
  return gulp.src([
    './' + path.bower + 'jquery/dist/jquery.js',
    './' + path.bower + 'modernizr/modernizr.js',
    base.src + path.js + '1-vendor/*.js',
    base.src + path.js + '2-base/*.js',
    base.src + path.js + '3-modules/*.js',
    base.src + path.js + '4-init/*.js'
  ])
    .pipe(concatJS('scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(base.dist + path.js))
})

// Minify images
gulp.task('minifyImages', function() {
  return gulp.src(base.src + path.images + '**/*')
    .pipe(imageMin({ progressive: true }))
    .pipe(gulp.dest(base.dist + path.images))
})

// Make them delicious webPs
gulp.task('webP', function() {
  return gulp.src(base.src + path.images + '**/*')
    .pipe(webP())
    .pipe(gulp.dest(base.dist + path.images))
})

// Run both the minify and webP task, asynchronously
gulp.task('images', ['minifyImages', 'webP'])


///////////////////////////////////////
//== Run Those Tasks (IF YOU DARE) ==//
///////////////////////////////////////

// Build task
gulp.task('build', ['clean'], function() {
  gulp.run('markup');
  gulp.run('styles');
  gulp.run('scripts');
  gulp.run('images');
})

// Default task
gulp.task('default', function() {
  gulp.run('build');
  gulp.run('watch');
})

// Watch task
gulp.task('watch', ['default', 'browser-sync'], function() {
  gulp.watch(base.src + path.js + '**/*.js', ['scripts']).on('change', reload);
  gulp.watch(base.src + path.styles + '**/*.scss', ['styles']).on('change', reload);
  gulp.watch(base.src + path.data + '**/*.json', ['markup']).on('change', reload);
  gulp.watch(base.src + path.markup + '**/*.pug', ['markup']).on('change', reload);
})
