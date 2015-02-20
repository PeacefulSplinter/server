var gulp = require('gulp');
var mocha = require('gulp-mocha');
var shell = require('gulp-shell');
var jshint = require('gulp-jshint');
//var stylish = require('jshint-stylish');
var paths = {
	test: ['./api/user/spec/**/*.js'],
	api: ['./api/**/*.js'],
	config: ['./config/**/*.js']
};

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

gulp.task('test', function(){
	return gulp.src(paths.test)
			.pipe(mocha({reporter: 'nyan'}))
			.once('end', function(){
				process.exit();
			})
			.on('error', handleError); 
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

gulp.task('deploy', shell.task(['git add --all', 'git commit -m "push to deployment"', 'git push heroku master']));

gulp.task('default', ['jshint-api', 'jshint-config']);

