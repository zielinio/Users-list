var gulp = require('gulp');
var bower = require('gulp-bower');
var connect = require('gulp-connect');
var sass = require('gulp-sass');

var config = {
    sassPath: 'app/sass/**/*.scss',
    bowerDir: 'app/bower_components'
};

gulp.task('bower', function() {
    return bower()
       .pipe(gulp.dest(config.bowerDir));
});

gulp.task('connect', function () {
  connect.server({
    root: 'app/',
    livereload: true
  });
});

gulp.task('sass', function () {
  gulp.src(config.sassPath)
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('app/css'))
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch(config.sassPath, ['sass']);
});

gulp.task('start', ['bower', 'connect', 'watch']);

gulp.task('default', function() {

});