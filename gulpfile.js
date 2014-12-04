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

gulp.task('conversion', function() {
    // place code for your default task here
    return gulp.src(['demo/js/jquery.min.js',
        'js/grooscript.min.js',
        'js/grooscript-tools.js',
        'js/ace.js',
        'js/mode-groovy.js',
        'js/ConvertedCode.js',
        'js/ConversionPresenter.js'])
        .pipe(uglify())
        .pipe(concat('conversion.js'))
        .pipe(gulp.dest('js'));
});