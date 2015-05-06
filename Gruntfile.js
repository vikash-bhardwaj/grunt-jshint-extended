/*
 * grunt-jshint-extended
 * https://github.com/vikash-bhardwaj/grunt-jshint-extended
 *
 * Copyright (c) 2015 Vikash Bhardwaj
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        // Before generating any new files, remove any previously-created files.
        clean: {
            js: ["tempjs", "js/errors/"]
        },
        jshintextended: { // Grunt JSHINT Extended Plug-in
            all: ['js/**/*.js', '!js/plugins/**/*.js'],
            options: {
                // This will generate the report in HTML format.
                reporter: require('jshint-html-reporter'),
                // JS Validation rules are configured in .jshintrc file.
                jshintrc: '.jshintrc',
                jshintExtraOpts: {
                    errorReportDir: "js_errors",
                    removeTempFile: true
                }
            }
        }

    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');
    //grunt.loadTasks('tasks/lib');

    // These plugins provide necessary tasks.
    //grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');

    // By default, lint and run all tests.
    grunt.registerTask('default', ['clean', 'jshintextended']);

};
