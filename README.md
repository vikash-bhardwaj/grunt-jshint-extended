# grunt-jshint-extended
Repository for grunt-jshint-extended - a grunt plug-in to have some extended options over [grunt-contrib-jshint](https://github.com/gruntjs/grunt-contrib-jshint) plug-in. It provides you different custom tasks to vlidate your JS files which enable developers to have more freedom like:

	- Validating all JS files at once will not generate a single report rather it will generate separate reports for each file with their names at configured path. This will be more structured than a single file.
	- Other benefits includes that we can validate only specific JS lines of code in a given JS file and not the whole JS file. These options can be helpful for existing projects where we need to validate only new/specific code and not the whole JS.

Please read more about available tasks <a href = "#tasks" >below</a>.
	
## Getting Started
This package requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-jshint-extended --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-jshint-extended');
```

And add to your task list using `jshintextended`:

```js
grunt.registerTask('default', ['jshintextended']);
```

## The "jshintextended" task

### Overview
In your project's Gruntfile, add a section named `jshintextended` to the data object passed into `grunt.initConfig()`.

Task `jshintextended` except any setting which works with [grunt-contrib-jshint](https://github.com/gruntjs/grunt-contrib-jshint) plug-in. Catch here is that you have to provide one extra Object in `jshint` options object with name `jshintExtraOpts`, please see below example:

```js
jshintextended: {
    all: ['js/**/*.js', '!js/plugins/**/*.js'],
    options: {
        // This will generate the report in HTML format.
        reporter: reporter,
        // JS Validation rules are configured in .jshintrc file.
        jshintrc: '.jshintrc',
        jshintExtraOpts: {
            errorReportDir: "js_errors/",
            removeTempFile: true
        }
    }
}
```
<b>Note:</b> For other standard JSHINT options please refer to [grunt-contrib-jshint](https://github.com/gruntjs/grunt-contrib-jshint)

### Options

#### options.jshintExtraOpts
Type: `Object` <br/>
Default value: {
	errorReportDir: "js/errors/",
    removeTempFile: false // This Property stands true only for custom helper task "validatejslines".
}

Object to define the extra settings over original jshint plug-in which will be used by this plug-in. Please read below about each setting.

#### options.jshintExtraOpts.errorReportDir
Type: `String` <br/>
Default value: `js_errors/`
Directory Path where JS error reports will be generated in form of HTML with JS file names.

#### options.jshintExtraOpts.removeTempFile
Type: `Boolean` <br/>
Default value: `'true'`
Setting it `false` will not delete the temp JS file from root folder. This property works only with `validatejslines` custom task.

## <div id="tasks">Tasks Available</div>

### validatejslines
Running 'validatejslines' task by `grunt validatejslines` command or by selecting option `Validate specific Lines of js file` from above mentioned default 'grunt' task will validate only Lines of Code for provided one JS file in prompted Input Textbox with rules mentioned in '.jshintrc' file. This task will Prompt developer to provide JS file name with relative path to your root directory followed by line ranges to be validated.

For example you have a js file with path 'js/test.js' and you want to validate lines 1-5 and 15-18 from this file then provide below data into prompted textbox. You can provide as many as line ranges separated by a space.

```shell
  js/test.js 1-5 15-18
```


### validatejs
Running 'validatejs' task by `grunt validatejs` command or by selecting option `Validate Specific js` from above mentioned default 'grunt' task will validate only JS files provided in prompted Input Textbox with rules mentioned in '.jshintrc' file. This task will Prompt developer to provide JS file names with relative path to your root directory in a Textbox and then same will be validated to generate the report.

For example if you want to validate multiple js files then provide those JS file names in below format. Please note that file names should be provided with relative path to your root directory and multiple file names should be provided separated by space.

```shell
  js/test.js js/test1.js js/test2.js js/test3.js
```


### validateselectedjs
Running 'validateselectedjs' task by `grunt validateselectedjs` command or by selecting option `Validate Selected js` from above mentioned default 'grunt' task will validate only JS files selected by user from a list of JS files with rules mentioned in '.jshintrc' file. This task will Prompt developer to select JS file names in form of Checkbxes and files list will be generated by files configured in JSHINT option with variable '<b>jsFilesToBeValidated</b>'. Selection of files can be made by Space 'key' and then can be run by 'return' key.


### validatealljs
Running 'validatealljs' task by `grunt validatealljs` command or by selecting option `Validate All js` from above mentioned default 'grunt' task will validate all the JS files with rules mentioned in '.jshintrc' file. This will validate all the JS files configured in JSHINT task option with variable '<b>jsFilesToBeValidated</b>'.