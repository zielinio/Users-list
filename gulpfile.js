var gulp = require('gulp');
var bower = require('gulp-bower');
var connect = require('gulp-connect');

var config = {
    sassPath: 'app/sass',
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


gulp.task('start', ['bower', 'connect']);

gulp.task('default', function() {

});