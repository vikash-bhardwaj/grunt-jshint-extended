/*
 * grunt-jshint-extended
 * https://github.com/vikash-bhardwaj/grunt-jshint-extended
 *
 * Copyright (c) 2015 Vikash Bhardwaj
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/**/*.js'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            js: ["tempjs", "js/errors/"]
        },
        jshintextended: { // Grunt w3c validation plugin
            options: {
                all: ['js/**/*.js', '!js/plugins/**/*.js']
                // This will generate the report in HTML format.
                // JS Validation rules are configured in .jshintrc file.

                reporter: require('jshint-html-reporter'),
                jshintrc: '.jshintrc'
            },
            errorReportDir: "js/errors/"
        }

    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'clean' 'jshintextended']);

};
