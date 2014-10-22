var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');


gulp.task('default', function() {
  // place code for your default task here
  return gulp.src(['demo/js/jquery.min.js',
      'demo/js/grooscript.min.js',
      'demo/js/grooscript-tools.js',
      'demo/js/TodoApp.js',
      'demo/js/react.js',
      'js/slick.min.js'])
      .pipe(uglify())
      .pipe(concat('index.js'))
      .pipe(gulp.dest('js'));
});