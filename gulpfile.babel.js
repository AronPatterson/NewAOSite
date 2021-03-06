'use strict';

import plugins       from 'gulp-load-plugins';
import yargs         from 'yargs';
import browser       from 'browser-sync';
import gulp          from 'gulp';
import jshint        from 'jshint';
import mocha         from 'gulp-mocha';
import rimraf        from 'rimraf';
import yaml          from 'js-yaml';
import fs            from 'fs';
import webpackStream from 'webpack-stream';
import webpack2      from 'webpack';
import named         from 'vinyl-named';

// Load all Gulp plugins into one variable
const $ = plugins();

// Check for Production flag
// Production being turned off will print Source Maps for files
const PRODUCTION = true;

// Load settings from config.yml
const { COMPATIBILITY, PORT, UNCSS_OPTIONS, PATHS } = loadConfig();

function loadConfig() {
  let ymlFile = fs.readFileSync('config.yml', 'utf8');
  return yaml.load(ymlFile);
}

// Delete the "dist" folder
// This happens every time a build starts
function clean(done) {
  rimraf(PATHS.dist, done);
}

// Copy files out of the assets folder
// This task skips over the "img", "js", and "scss" folders, which are parsed separately
function copy() {
  return gulp.src(PATHS.content)
    .pipe(gulp.dest(PATHS.dist + '/'));
}

// Compile Sass into CSS
// In production, the CSS is compressed
function sass() {
  return gulp.src('src/scss/app.scss')
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      includePaths: PATHS.sass
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: COMPATIBILITY
    }))
    // Comment in the pipe below to run UnCSS in production
    //.pipe($.if(PRODUCTION, $.uncss(UNCSS_OPTIONS)))
    .pipe($.if(PRODUCTION, $.cleanCss({ compatibility: 'ie9' })))
    .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
    .pipe(gulp.dest(PATHS.dist + '/css'))
    .pipe(browser.reload({ stream: true }));
}

let webpackConfig = {
  module: {
    rules: [
      {
        test: /.js$/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      }
    ]
  }
}
// Combine JavaScript into one file
// In production, the file is minified
function javascript() {
  return gulp.src(PATHS.jsdir)
    .pipe(named())
    .pipe($.sourcemaps.init())
    .pipe($.jshint())
    .pipe(webpackStream(webpackConfig, webpack2))
    .pipe($.if(PRODUCTION, $.uglify()
      .on('error', e => { console.log(e); })
    ))
    .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
    .pipe($.concat('app.min.js'))
    .pipe(gulp.dest(PATHS.dist + '/js'));
}

// Combine all Angular into one file
// In production, the file is minified
function angular() {
  return gulp.src(PATHS.angulardir)
    .pipe(named())
    .pipe($.sourcemaps.init())
    .pipe(webpackStream(webpackConfig, webpack2))
    .pipe($.if(PRODUCTION, $.uglify()
      .on('error', e => { console.log(e); })
    ))
    .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
    .pipe($.concat('ao.app.min.js'))
    .pipe(gulp.dest(PATHS.dist + '/angular'))
    .pipe(browser.reload({ stream: true }));
}

function mochaTesting() {
  return gulp.src(PATHS.testingdir)
    .pipe(mocha({
      reporter: 'list',
      globals: {
        should: require('should')
      }
    }))
}

// Copy images to the "dist" folder
// In production, the images are compressed
function images() {
  return gulp.src('src/img/**/*')
    .pipe($.if(PRODUCTION, $.imagemin({
      progressive: true
    })))
    .pipe(gulp.dest(PATHS.dist + '/img'));
}

// Start a server with BrowserSync to preview the site in
function server(done) {
  browser.init({
    startPath: '/', server: PATHS.dist, port: PORT
  });
  done();
}

// Watch for changes to static template pages, Sass, and JavaScript
function watch() {
  gulp.watch(PATHS.assets, copy);
  gulp.watch('src/**/*.html').on('all', gulp.series(copy, browser.reload)); // this watches the html content for changes
  gulp.watch('src/scss/**/*.scss').on('all', gulp.series(sass)); // SASS for changes
  gulp.watch('src/js/**/*.js').on('all', gulp.series(javascript, browser.reload)); // JS for changes
  gulp.watch('src/angular/**/*.js').on('all', gulp.series(angular, browser.reload)); // Angular for changes
  gulp.watch('src/img/**/*').on('all', gulp.series(images, browser.reload)); // images for changes
}

// Build the "dist" folder by running all of the below tasks
gulp.task('build',
 gulp.series(clean, gulp.parallel(sass, javascript, angular, images, copy)));

// Build the site, run the server, and watch for file changes
gulp.task('default',
  gulp.series('build', server, watch));