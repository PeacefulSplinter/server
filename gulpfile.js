var gulp = require('gulp');
var mocha = require('gulp-mocha');
var path = {
	test: ['./spec/**/*.js']
};

gulp.task('test', function(){
	return gulp.src(path.test).pipe(mocha({reporter: 'nyan'}))
	.once('end', function(){
		process.exit();
	})
})