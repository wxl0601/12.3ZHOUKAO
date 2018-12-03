/*
 * @Author: 王鑫磊 
 * @Date: 2018-12-03 08:52:04 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-12-03 09:27:12
 */


var gulp = require('gulp');

var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var server = require('gulp-webserver');
// var babel = require('gulp-babel');
var url = require('url');
var data = require('./src/json/data.json');
var path = require('path');
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

gulp.task('dev',gulp.parallel('devScss','watch'));


//起服务

gulp.task('server',function(){
    return gulp.src('src')
    .pipe(server({
        port:8888,
        open:true,
        middleware:function(req,res,next){
            var pathname = url.parse(req.url).pathname;

            if(pathname === '/favicon.ico'){
                res.end('')
                return 
            }

            if(pathname === '/getDate'){
                res.end(JSON.stringify({code:1,list:data[0]}))
            }else{
                pathname = pathname === '/' ? 'index.html' : pathname;
                res.end(fs.readFileSync(path.join(__dirname,'src',pathname)))
            }
        }
    }))
})




