/*
 * @Author: 王鑫磊 
 * @Date: 2018-12-03 08:52:04 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-12-03 10:11:28
 */


var gulp = require('gulp');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var server = require('gulp-webserver');
var babel = require('gulp-babel');
var url = require('url');
var data = require('./src/json/data.json');
var path = require('path');
var fs = require('fs');


//6.	在gulp中创建scss任务，进行scss文件编译,并且压缩css  10分
gulp.task('devScss',function(){
    return gulp.src('./src/scss/index.scss')
    .pipe(sass())
    .pipe(gulp.dest('./src/css'))
})
//8.	在gulp中创建watch任务，进行js，css文件监听，自动执行对应的任务  10分
gulp.task('watch',function(){
    return gulp.watch('./src/scss/index.scss',gulp.series('devScss'))
})




//5.	在gulp中使用browserSync启动服务，并且提供自动刷新功能  10分

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
                res.end(JSON.stringify({code:1,list:data[0].title}))
            }else{
                pathname = pathname === '/' ? 'index.html' : pathname;
                res.end(fs.readFileSync(path.join(__dirname,'src',pathname)))
            }
        }
    }))
})
//7.	在gulp中新建js任务编译js文件，合并所有js，并且压缩  10分
gulp.task('uGlify',function(){
    return gulp.src(['./src/js/*.js',"!./src/js/lib/*.js"])
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('./src/js'))
})



// 9.	在gulp中创建default任务，默认执行browserSync服务，js，css，watch任务  10分
gulp.task('default',gulp.parallel('devScss','uGlify','watch',"server"));

//ok


