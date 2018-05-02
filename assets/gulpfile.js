var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var gutil = require('gulp-util');
var babel = require("gulp-babel");
var minify = require('gulp-minify');


// Server + watching sass and template files
gulp.task('serve', ['sass'], function() {

  browserSync.init({
    proxy: "http://sitename.dev.dd:8083",
    browser: "google chrome"
    // port: 8888,
    // browser: "safari"
    // browser: "FirefoxDeveloperEdition"
    // browser: "firefox"
    // reloadDelay: 2000
  });

  gulp.watch("sass/**/*/*.scss", ['sass']);
  gulp.watch("js/*.js", ['build']);
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

// Use Babel to compile ES6 to ES5 (compatable with IE10+)
// Minify files after they are compiled
gulp.task("build", function () {
  return gulp.src("js/*.js")
    .pipe(babel())
    .pipe(gulp.dest("js/compiled"))
    .pipe(minify({
        ext:{
            min:'.min.js'
        },
        exclude: ['tasks'],
        noSource: true,
        ignoreFiles: ['.combo.js', '.min.js']
    }))
    .pipe(gulp.dest('js/min'))
});

// Gulp Minify - https://github.com/hustxiaoc/gulp-minify
// use command "gulp compress" if you only want to compress files
gulp.task('compress', function() {
  gulp.src('js/compiled/*.js')
    .pipe(minify({
        ext:{
            min:'.min.js'
        },
        exclude: ['tasks'],
        noSource: true,
        ignoreFiles: ['.combo.js', '.min.js']
    }))
    .pipe(gulp.dest('js/min'))
});

// Default Task
gulp.task('default', ['serve']);
