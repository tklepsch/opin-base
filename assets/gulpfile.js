var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var gutil = require('gulp-util');


// Server + watching sass and template files
gulp.task('serve', ['sass'], function() {

  browserSync.init({
    proxy: "http://opin-base.dd:8083/",
    browser: "google chrome"
    // port: 8888,
    // browser: "safari"
    // browser: "FirefoxDeveloperEdition"
    // browser: "firefox"
    // reloadDelay: 2000
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


gulp.task('default', ['serve']);
