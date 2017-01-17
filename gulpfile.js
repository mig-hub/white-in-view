var gulp       = require('gulp'), 
    uglify     = require('gulp-uglify'), 
    rename     = require('gulp-rename'), 
    sourcemaps = require('gulp-sourcemaps');

gulp.task('build', function() {
    return gulp.src('./white-in-view.js')
        .pipe(uglify())
        .pipe(rename('white-in-view.min.js'))
        .pipe(gulp.dest('./'));
});

gulp.task('default', ['build']);