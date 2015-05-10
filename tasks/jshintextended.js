/**
 * grunt-jshint-extended
 * https://github.com/vikash-bhardwaj/grunt-jshint-extended
 * 
 * Copyright (c) 2015 Vikash Bhardwaj
 * Licensed under the MIT license.
 */

module.exports = function (grunt) {
    var reporter = require('jshint-html-reporter'),
        taskName = "validatealljs",
        taskNames = {
            validatealljs: "Validate all JS files for the rules defined in `.jshintrc` file.",
            validatejs: "Prompt to take JS file names in a Textbox and validate those files with rules defined in `.jshintrc` file.",
            validateselectedjs: "Prompt to take JS file names with Checkboxes and then validate selected files with the rules defined in `.jshintrc` file.",
            validatejslines: "Prompt to take JS file name with Line Numbers to validate the provided lines with rules defined in `.jshintrc` file."
        };

    /**
     * Register the Custom Tasks for JSHINT Advance helper tasks.
     * Each task will update the global Variable "taskName" and run "jshintextended" custom task.
     */

    for(var item in taskNames) {
        grunt.registerTask( item, taskNames[item], function() {
            taskName = this.name;
            grunt.task.run("jshintextended");
        });
    }

    // Load jshint and prompt tasks so that same can be used by custom task "jshintextended"
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-prompt');

    /**
     * Register the Custom Tasks "jshintextended" for jshint.
     * This custom task will run helper task run by user and help task name will be picked from Global Variable "taskName".
     * All the custom helper tasks are defined in "tasks/lib/jshintcustomtasks.js"
     * Custom helper tasks are defined with same name defined in "taskNames" Object followed by string "_core".
     */

    grunt.registerMultiTask('jshintextended', 'Extended task for original JSHINT task', function () {
        // Default Options for task and will be merged with options provided by user's.
        var options = this.options({
                reporter: reporter,
                jshintrc: '.jshintrc',
                jshintExtraOpts: {
                    errorReportDir: "js_errors/",
                    removeTempFile: true // This Property stands true only for custom helper task "validatejslines".
                }
            }),
            jshintExtraOpts = options["jshintExtraOpts"];
        
        // Delete the Object from task "options" object so that same can be used for jshint options.
        delete options["jshintExtraOpts"];

        var jshintOptions = options,
            jshintFiles = this.filesSrc;

        // Directory path for jshint error files path, this config will be used by custom helper tasks defined in "tasks/lib/jshintcustomtasks.js".
        grunt.config.set("jsErrorFilesPath", jshintExtraOpts.errorReportDir);

        // JS Files Globbing Pattern to be validated, this config will be used by custom helper tasks defined in "tasks/lib/jshintcustomtasks.js".
        grunt.config.set("jsFilesToBeValidated", jshintFiles);

        // Set the grunt config for "removeTempFile" which will be used to decide if system should remove the temp generated JS file or not.
        grunt.config.set("removeTempFile", jshintExtraOpts.removeTempFile);

        // Set the options for jshint so that same can be used by custom helper tasks.
        grunt.config.set("jshint.options", jshintOptions);

        // Rn the custom helper task.
        grunt.task.run( taskName + "_core" );
        
    });

    // LOAD CUSTOM REGISTERED TASKS
    // =======================================================
    // This below command load all the custom tasks created for JSHINT under Lib directory.
    grunt.loadTasks(__dirname + '/lib');

};
