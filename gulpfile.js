var gulp = require('gulp');
var replace = require('gulp-replace');
var browserify = require('browserify');
var argv = require('yargs').argv;
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var o = require('open');
var ripple = require('ripple-emulator');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('mobile-static', function() {
  gulp.src('src/index.html')
    .pipe(gulp.dest('www'));

  gulp.src('src/img/**/*')
    .pipe(gulp.dest('www/img'));

  gulp.src('src/app/**/*')
    .pipe(gulp.dest('www/app'));

  gulp.src('src/common/**/*')
    .pipe(gulp.dest('www/common'));
});

gulp.task('mobile-javascript', function() {
  return browserify('./main.js', {
    basedir: './src/js',
    paths: ['./']
  }).bundle()
    .pipe(source('mobile.js'))
    .pipe(buffer())
    .pipe(replace('http://localhost:9000', argv.baseUrl || 'http://localhost:9000'))
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('www/js'));
});

gulp.task('mobile-stylesheets', function() {
  return gulp.src('src/css/**/*.css')
    .pipe(gulp.dest('www/css'));
});

gulp.task('build', ['mobile-static', 'mobile-javascript', 'mobile-stylesheets']);

gulp.task('default', ['build'], function() {

  gulp.watch(['src/app/**/*', 'src/common/**/*', './src/index.html', './src/img/**/*'], function() {
    gulp.run('mobile-static');
  });

  gulp.watch('./src/js/**', function() {
    gulp.run('mobile-javascript');
  });

  gulp.watch('./src/css/**', function() {
    gulp.run('mobile-stylesheets');
  });

  var options = {
    keepAlive: false,
    open: true,
    port: 4400
  };

  // Start the ripple server
  ripple.emulate.start(options);

  //TODO add livereload to ripple
  if (options.open) {
    o('http://localhost:' + options.port + '?enableripple=cordova-3.0.0');
  }
});
