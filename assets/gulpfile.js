var domain = "http://site.dd:8083"; // Set this to your local development domain.

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var gutil = require('gulp-util');
var minify = require('gulp-minify');


// Server + watching sass and template files
gulp.task('serve', ['sass'], function() {

  browserSync.init({
    proxy: domain,
    browser: "google chrome"
  });

  gulp.watch("sass/**/*/*.scss", ['sass']);
  gulp.watch("templates/**/*/*.twig").on('change', browserSync.reload);
});


// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
  return gulp.src("sass/**/*.scss")

    .pipe(plumber(function(error) {
      gutil.log(gutil.colors.red('Error (' + error.plugin + '): ' + error.message));
      this.emit('end');
    }))
    .pipe(sourcemaps.init())
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(autoprefixer([
      'ie >= 10',
      'ie_mob >= 10',
      'ff >= 30',
      'chrome >= 28',
      'safari >= 5',
      'opera >= 23',
      'ios >= 6',
      'android >= 4.2',
      'bb >= 10'
    ]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("css"))
    .pipe(browserSync.stream({
      stream: true
    }));
});

// Gulp Minify - https://github.com/hustxiaoc/gulp-minify
gulp.task('compress', function() {
  gulp.src('js/*.js')
    .pipe(minify({
        ext:{
            src:'-debug.js',
            min:'.min.js'
        },
        exclude: ['tasks'],
        ignoreFiles: ['.combo.js', '.min.js']
    }))
    .pipe(gulp.dest('js/min'))
});

// Default Task
gulp.task('default', ['serve']);
