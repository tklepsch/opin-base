// Set domain to your local development domain or 'auto' to use BrowserSync.
// Set domain to null to disable BrowserSync.
var domain = 'auto';

var sassLintConfigFile = 'base-sass-lint.yml';


var gulp = require('gulp');
var sass = require('gulp-sass');
var sassLint = require('gulp-sass-lint');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();

var cache = require('gulp-cache');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');
var log = require('fancy-log');
var colors = require('ansi-colors');
var notify = require('gulp-notify');
var exec = require('child_process').exec;
var fs = require('file-system');

var babel = require("gulp-babel");
var minify = require('gulp-minify');

if (domain == 'auto') {
  // Attempt to automatically get the domain name from Dev Desktop's config files.
  domain = require('gulp-getdevdesktopdomain');
  if (domain == null) {
    log.warn(colors.yellow.bold('Warning: Could not set BrowserSync domain name automatically.'));
    log.warn(colors.yellow.bold('  Manually set a domain name in gulpfile.js to use BrowserSync.'));
  } else {
    log.info('Found Dev Desktop domain: ' + colors.magenta(domain));
  }
}

// Check for existence of Sass-lint config file.
var runSassLint = false;
try {
  fs.accessSync(sassLintConfigFile);
  runSassLint = true;
  log.info('Using sass-lint config file: ' + colors.magenta(sassLintConfigFile));
} catch (err) {
  log.warn(colors.yellow.bold(`Warning: Sass-lint config file ${sassLintConfigFile} was not found. Sass-lint is disabled.`));
}

// Server + watching sass and template files
gulp.task('serve', function() {

  // Skip BrowserSync init if no domain is provided.
  if (domain) {
    browserSync.init({
      proxy: domain,
      scrollRestoreTechnique: 'window.name'
      // browser:     "google chrome"
    });
  }

  gulp.watch("sass/**/*.scss").on('change', gulp.series(['sass']));
  gulp.watch(["../templates/**/*.twig", "../includes/**/*.inc"]).on('change', gulp.series(['clearDrupalCache', 'browserSyncReload']));
  gulp.watch('js/*.js').on('change', gulp.series(['jsbuild', 'browserSyncReload']));
});

gulp.task('browserSyncReload', function() {
  return browserSync.reload();
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
  stream = gulp.src("sass/**/*.scss")
    .pipe(plumber(function(error) {
      log.error(colors.red.bold('Error (' + error.plugin + '): ' + error.message));
      this.emit('end');
    }))
    .pipe(plumber({errorHandler: notify.onError("Error : <%= error.message %>")}));

  // Conditionally add sass-lint to the pipe if it has a config file.
  // Otherwise it spews out too many warnings that we don't care about.
  if (runSassLint) {
    stream = stream.pipe(sassLint({
      configFile: sassLintConfigFile
     }))
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
  }

  stream = stream.pipe(sourcemaps.init())
    .pipe(sourcemaps.identityMap())
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer([
      'ie >= 10',
      'ie_mob >= 10',
      'ff >= 30',
      'chrome >= 28',
      'safari >= 5',
      'opera >= 23',
      'ios >= 6',
      'android >= 4.2'
    ]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("css"));

  // Only add BrowserSync to the stream if a domain name is provided.
  if (domain) {
    stream = stream.pipe(
      browserSync.stream({
        stream: true
      })
    );
  }

  return stream;
});

// Use Babel to compile ES6 to ES5 (compatable with IE10+)
// Minify files after they are compiled
gulp.task("jsbuild", function () {
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

gulp.task('clearDrupalCache', function(done) {
  drushCmd = 'drush cr';

  if (drushCmd) {
    exec(drushCmd, function (err, stdout, stderr) {
      log(stdout);
      log(stderr);
      done();
    });
  }
});

// Default Task
gulp.task('default', gulp.series(['sass', 'serve']));
