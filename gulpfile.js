var gulp = require('gulp');
var gutil = require('gulp-util');
var plugins = require('gulp-load-plugins')();
var karma = require('karma').server;
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var webpackConfig = require('./webpack.config.js');


gulp.task('clean', function () {
    return gulp.src('build', {read: false})
        .pipe(plugins.clean());
});

gulp.task('test', function (done) {
    karma.start({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done);
});

gulp.task('webpack', function () {
    var myConfig = Object.create(webpackConfig);
    return gulp.src('src/main/javascript/entry.js')
        .pipe(plugins.webpack(myConfig))
        .pipe(gulp.dest('target/classes/static/js/'));
});

gulp.task('webpack:watch', function () {
    var myConfig = Object.create(webpackConfig);
    myConfig.watch = true;
    return gulp.src('src/main/javascript/entry.js')
        .pipe(plugins.webpack(myConfig))
        .pipe(gulp.dest('target/classes/static/js/'));
});

gulp.task('jshint', function () {
    return gulp.src('src/scripts/**/*.js')
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('default'))
});

gulp.task('inject', ['webpack'], function () {
    return gulp.src('src/index.html')
        .pipe(plugins.inject(gulp.src(['./build/js/**/*.js'], {read: false}), {ignorePath: '../build', relative: true}))
        .pipe(gulp.dest('./build'))
});

gulp.task("dev-server", function () {
    // modify some webpack config options
    var myConfig = Object.create(webpackConfig);
    myConfig.devtool = "eval";
    myConfig.debug = true;

    // Start a webpack-dev-server
    new WebpackDevServer(webpack(webpackConfig), {
        publicPath: '/build',
        stats: {
            colors: true
        }
    }).listen(8080, "localhost", function (err) {
            if (err) {
                throw new gutil.PluginError("webpack-dev-server", err);
            }
            gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");
        });
});

gulp.task('build', ['clean', 'test', 'jshint', 'inject']);