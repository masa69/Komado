var gulp   = require('gulp');
var sass   = require('gulp-sass');
var concat = require('gulp-concat');

gulp.task('default', function()
{
	// gulp.src('sass/fa.scss')
	// 	.pipe(sass({outputStyle  : 'compressed',}))
	// 	.pipe(gulp.dest('./public/css'));

	gulp.src('sass/style.scss')
		.pipe(sass({outputStyle  : 'compressed',}))
		.pipe(gulp.dest('./public/css'));

	gulp.src([
			'bower_components/*/*.min.js',
			'bower_components/*/dist/*.min.js',
			'bower_components/moment/min/moment.min.js',
		])
		.pipe(concat('lib.js'))
		.pipe(gulp.dest('./public/js'));

	gulp.src(['js/app.js', 'js/*/*.js'])
		.pipe(concat('script.js'))
		.pipe(gulp.dest('./public/js'));
});