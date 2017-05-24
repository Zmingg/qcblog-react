const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const browserify = require('browserify');
const source = require('vinyl-source-stream')
const streamify = require('gulp-streamify');

gulp.task('convertJS', function(){
    var b = browserify();
    return b.add('./app/js/app.js')
    .bundle()
    .pipe(source('app.js'))
    // .pipe(streamify(uglify()))
    .pipe(gulp.dest('dist/js'))   
})
gulp.task('start', ['convertJS']);