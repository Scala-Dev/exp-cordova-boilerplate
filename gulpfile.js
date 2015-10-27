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


/* angular tasks */
gulp.task('angular-static', function() {
  gulp.src('./src/examples/angular/index.html')
    .pipe(gulp.dest('www'));

  gulp.src('./src/examples/angular/img/**/*')
    .pipe(gulp.dest('www/img'));

  gulp.src('./src/examples/angular/app/**/*')
    .pipe(gulp.dest('www/app'));

  gulp.src('./src/examples/angular/common/**/*')
    .pipe(gulp.dest('www/common'));
});


gulp.task('angular-stylesheets', function() {
  return gulp.src('./src/examples/angular/css/**/*.css')
    .pipe(gulp.dest('www/css'));
});

gulp.task('build-angular', ['angular-static', 'angular-stylesheets', 'mobile-javascript']);

gulp.task('watch-angular', ['build-angular'], function() {

  gulp.watch([
    './src/examples/angular/app/**/*',
    './src/examples/angular/common/**/*',
    './srcexamples/angular/index.html',
    './srcexamples/angular/img/**/*'],
    function() {
      gulp.run('angular-static');
    });

  gulp.watch('./src/examples/angular/css/**', function() {
    gulp.run('angular-stylesheets');
  });

  gulp.watch('./src/js/**', function() {
    gulp.run('mobile-javascript');
  });
});


/* basic tasks */
gulp.task('build-basic', ['mobile-javascript'], function() {
  gulp.src('./src/examples/basic/index.html')
    .pipe(gulp.dest('www'));
});


/* default tasks */
gulp.task('build', ['build-angular']);

gulp.task('default', ['watch-angular'], function() {

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
