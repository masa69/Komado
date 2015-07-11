module.exports = function (grunt) {
	// Project configuration.
	grunt.initConfig({
		// Task configuration.
		karma: {
			unit: {
				configFile: 'karma.conf.js'
			}
		},
		jshint: {
			options: {
				jshintrc: true
			},
			grunt:  'Gruntfile.js',
			source: 'public/js/*/*.js',
			tests:  'tests/*/*.js'
		}
	});
	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-contrib-jshint');

	// command lists
	grunt.registerTask('default', ['karma', 'jshint']);
	grunt.registerTask('test', ['karma']);
};