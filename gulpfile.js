'use strict';
var gulp = require('gulp');
var run = require('run-sequence');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var angularFileSort = require('gulp-angular-filesort');
var preprocess = require('gulp-preprocess');
var del = require('del');

gulp.task('clean', function(cb){
  return del('dist/', cb);
});

gulp.task('lint', function(){
  return gulp.src([
    'lib/*.js'
  ])
  .pipe(jshint())
  .pipe(jshint.reporter('default'));
});

gulp.task('build', function(){
  return gulp.src([
    'lib/*.js'
  ])
  .pipe(preprocess())
  .pipe(angularFileSort())
  .pipe(concat('angular-rest-helper.js'))
  .pipe(gulp.dest('dist/'))
  .pipe(uglify({
    compress: {
      drop_console: true
    }
  }))
  .pipe(rename({ suffix: '.min' }))
  .pipe(gulp.dest('dist/'));
});

gulp.task('default', function(){
  return run(
    'clean',
    'lint',
    'build');
});
