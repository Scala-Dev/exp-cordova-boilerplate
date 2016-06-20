var gulp = require('gulp');
var replace = require('gulp-replace');
var browserify = require('browserify');
var argv = require('yargs').argv;
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var o = require('open');
var ripple = require('ripple-emulator');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');


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


gulp.task('static', function() {
  gulp.src('./src/index.html')
    .pipe(gulp.dest('www'));

  gulp.src('./src/img/**/*')
    .pipe(gulp.dest('www/img'));

  gulp.src('./src/app/**/*')
    .pipe(gulp.dest('www/app'));

  gulp.src('./src/common/**/*')
    .pipe(gulp.dest('www/common'));
});


gulp.task('stylesheets', function() {
  return gulp.src('./src/css/**/*.css')
    .pipe(gulp.dest('www/css'));
});

gulp.task('build', ['static', 'stylesheets', 'mobile-javascript']);

gulp.task('watch', ['build'], function() {

  gulp.watch([
    './src/app/**/*',
    './src/common/**/*',
    './srcindex.html',
    './srcimg/**/*'],
    function() {
      gulp.run('static');
    });

  gulp.watch('./src/css/**', function() {
    gulp.run('stylesheets');
  });

  gulp.watch('./src/js/**', function() {
    gulp.run('mobile-javascript');
  });
});


gulp.task('default', ['watch'], function() {

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

gulp.task('clean', function () {
  return del([
    'www/**/*',
    '!www',
    '!www/bower_components',
    '!www/bower_components/**/*'
  ]);
});
