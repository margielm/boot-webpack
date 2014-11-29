// Karma configuration
module.exports = function (config) {
    var webpack = require("webpack");
    config.set({

        // base path, that will be used to resolve files and exclude
        //basePath: '',


        // frameworks to use
        frameworks: ['jasmine'],


        // list of files / patterns to load in the browser
        files: [
            'src/test/javascript/*Spec.js'
        ],


        // list of preprocessors
        preprocessors: {
            'src/test/javascript/*Spec.js': ['webpack']
        },


        webpack: {
            resolve: {
                modulesDirectories: ['src/main/javascript/', 'node_modules', 'bower_components']
            },
            //module: {
            //    loaders: [
            //        {
            //            test: /\.less$/,
            //            loader: 'style!css!less'
            //        }, {
            //            test: /angular.min/,
            //            loader: 'exports?angular'
            //        },
            //        {
            //            test: /template.html$/,
            //            loader: 'ng-cache?prefix=[dir]'
            //        }
            //    ]
            //},
            plugins: [
                new webpack.ResolverPlugin(
                    new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
                )
            ]
        },


        webpackServer: {
            stats: {
                colors: true
            }
        },


        // test results reporter to use
        // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
        reporters: ['progress', 'junit'],
        junitReporter: {
            outputFile: 'target/karma-tests/test-results.xml'
        },


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,


        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera (has to be installed with `npm install karma-opera-launcher`)
        // - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
        // - PhantomJS
        // - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
        browsers: ['PhantomJS'],


        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 60000,


        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false,


        // List plugins explicitly, since autoloading karma-webpack
        // won't work here
        plugins: [
            require("karma-webpack"),
            require("karma-jasmine"),
            require("karma-junit-reporter"),
            require("karma-phantomjs-launcher")
        ]
    });
};