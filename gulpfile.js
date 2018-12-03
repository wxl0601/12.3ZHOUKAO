/*
 * @Author: 王鑫磊 
 * @Date: 2018-12-03 08:52:04 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-12-03 09:11:38
 */


var gulp = require('gulp');

var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
// var babel = require('gulp-babel');
var url = require('url');

var fs = require('fs');


//编译sass
gulp.task('devScss',function(){
    return gulp.src('./src/scss/index.scss')
    .pipe(sass())
    .pipe(gulp.dest('./src/css'))
})

gulp.task('watch',function(){
    return gulp.watch('./src/scss/index.scss',gulp.series('devScss'))
})

gulp.task('dev',gulp.parallel('devScss','watch'))

