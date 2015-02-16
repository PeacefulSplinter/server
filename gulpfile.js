var gulp = require('gulp');
var mocha = require('gulp-mocha');
var shell = require('gulp-shell');
var jshint = require('gulp-jshint');
//var stylish = require('jshint-stylish');
var paths = {
	test: ['./spec/**/*.js'],
	api: ['./api/**/*.js'],
	config: ['./config/**/*.js']
};

gulp.task('test', function(){
	return gulp.src(paths.test)
			.pipe(mocha({reporter: 'nyan'}))
			.once('end', function(){
				process.exit();
			});
});

// jshint's api folder
gulp.task('jshint-api', function(){
	gulp.src(paths.api)
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'));
});

// jshint's config folder
gulp.task('jshint-config', function(){
	gulp.src(paths.config)
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('deploy', shell.task(['git commit -am "push to deployment"', 'git push heroku master']));

gulp.task('default', ['jshint-api', 'jshint-config']);

