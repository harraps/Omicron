/*
	to gulp enter the command :
	gulp
*/

var gulp   = require('gulp'),
	concat = require('gulp-concat'),
	rename = require('gulp-rename'),
	insert = require('gulp-insert'),
	babel  = require('gulp-babel'),
	uglify = require('gulp-uglify'),
	srcmap = require('gulp-sourcemaps');

gulp.task('build', function() {
	var
	prepend = "(function (){\n",
	append  = "\n})();",
	srcs = [
		"src/Init.js",
		"src/Util.js",
		"src/blocks/Block.js",
		"src/**/*.js",
		"src/End.js"
	],
	dist = "build",
	name = "omicron.js",
	min  = "omicron.min.js";

	// extended file
	var file = gulp.src(srcs)
		.pipe(concat(name))
		.pipe(insert.wrap(prepend, append))
		.pipe(babel({
			presets : ['es2015']
		}))
		.pipe(gulp.dest(dist));

	// minified file
	var min_file = file.pipe(rename(min))
		.pipe(srcmap.init())
		.pipe(uglify())
		.pipe(srcmap.write('./'))
		.pipe(gulp.dest(dist));

});

gulp.task('default', [
	'build',
]);
