var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify-es').default;
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');
var fileinclude = require('gulp-file-include');

gulp.task('fileinclude', function() {
  gulp.src(['app/template/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file',
      context: {
        "home": false
      }

    }))
    .pipe(gulp.dest('app'));
});

gulp.task('sass', function() {
  return gulp.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'app',
        },
        notify: false
    })
})

gulp.task('useref', function(){
    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulpIf('*.js', uglify()))
        // Minifies only if it's a CSS file
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulp.dest('dist'))
});

gulp.task('fonts', function() {
    return gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'))
})


//COMPRESS IMAGES - QUICK SET UP, VIEW DOCUMENTATION AND OPTIMISE
gulp.task('images', function(){
    return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
    // Caching images that ran through imagemin
    .pipe(cache(imagemin({
        interlaced: true
    })))
    .pipe(gulp.dest('dist/images'))
});


//DELETE DIST FOLDER TO CLEAN
gulp.task('clean:dist', function() {
  return del.sync('dist');
})

//CLEAR CACHE
gulp.task('cache:clear', function (callback) {
    return cache.clearAll(callback)
})

gulp.task('watch', ['browserSync', 'sass','fileinclude'], function (){
    gulp.watch('app/scss/**/*.scss', ['sass']);
    // Reloads the browser whenever HTML or JS files change
    gulp.watch('app/template/**/*.html', ['fileinclude']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('build', function (callback) {
    runSequence('clean:dist',
        ['fileinclude','sass', 'images', 'fonts'], 'useref',
        callback
    )
})

gulp.task('default', function (callback) {
    runSequence(['sass','browserSync', 'watch'],
        callback
    )
})
