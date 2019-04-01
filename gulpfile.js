var gulp = require('gulp')
var {series, parallel, watch} = require('gulp')

var HtmlClean = require('gulp-htmlclean')
var ImageMin = require('gulp-imagemin')
var Uglify = require('gulp-uglify')
var StripDebug = require('gulp-strip-debug')
var Less = require('gulp-less')
var CleanCss = require('gulp-clean-css')
var PostCss = require('gulp-postcss')
var Autoprefixer = require('autoprefixer')
var Connect = require('gulp-connect')
var gUtil = require('gulp-util')
// var babel = require('gulp-babel')

var folder = {
    src : "src/",
    dist : "dist/"
}

var dev = process.env.NODE_ENV == 'development'

console.log(dev)

// gulp.task("html", function(){
//     gulp.src(folder.src + "html/*")
//         .pipe(gulp.dest(folder.dist + "html/"))
// })
// gulp.task('default', ["html"], function(){
//     console.log(123)
// })
function Html(cb){
    var page = gulp.src(folder.src + "html/*")
                   .pipe(Connect.reload())
    if(!dev){
        page.pipe(HtmlClean())
    }        
    page.pipe(gulp.dest(folder.dist + "html/"))
    cb()
}
function Css(cb){
    var page = gulp.src(folder.src + "css/*")
               .pipe(Connect.reload())
               .pipe(Less())
               .pipe(PostCss([Autoprefixer()]))
    if(!dev){
        page.pipe(CleanCss())        
    }
               
    page.pipe(gulp.dest(folder.dist + "css/"))
    cb()
}
function Js(cb){
    var page = gulp.src(folder.src + "js/*")
               .pipe(Connect.reload())
            //    .pipe(babel({
            //        presets : ['@babel/env']
            //    }))
               
    if(!dev){
        page.pipe(StripDebug())
            .pipe(Uglify())
            .on('error', function(err){
                gUtil.log(gUtil.colors.red('[Error]'), err.toString())
            })
    }
    page.pipe(gulp.dest(folder.dist + "js/"))
    cb()
}
function Image(cb){
    gulp.src(folder.src + 'images/*')
        .pipe(ImageMin())
        .pipe(gulp.dest(folder.dist + 'images/'))
    cb()
}
function server(cb){
    var serverconfig = {
        port : 8081,
        livereload : true
    }

    Connect.server(serverconfig)
    cb()
}

gulp.watch('src/html/*',Html)
gulp.watch('src/css/*',Css)
gulp.watch('src/js/*',Js)
gulp.watch('src/images/*',Image)

exports.default = series(parallel(Html, Css, Js, Image), server)