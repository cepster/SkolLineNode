var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('default', ['sass'], function(){
  'use strict';
});

gulp.task('dev', ['sass:watch'], function(){
    'use strict';
    console.log('Starting watch task');
});

gulp.task('sass', function(){
  'use strict';

  gulp.src('public/sass/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('public/styles'));
});

gulp.task('sass:watch', function () {
  'use strict';

  gulp.watch('public/sass/*.scss', ['sass']);
});
