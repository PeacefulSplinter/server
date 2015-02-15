var gulp = require('gulp');
var mocha = require('gulp-mocha');
var shell = require('gulp-shell');
var path = {
	test: ['./spec/**/*.js']
};

gulp.task('test', function(){
	return gulp.src(path.test).pipe(mocha({reporter: 'nyan'}))
	.once('end', function(){
		process.exit();
	})
})

gulp.task('deploy', shell.task(['git commit -am "push to deployment"', 'git push heroku master']))

