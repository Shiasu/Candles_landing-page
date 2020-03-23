const gulp = require("gulp");
const watch = require("gulp-watch");
const prefixer = require("gulp-autoprefixer");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");

gulp.task("html", function() {
	return gulp.src("src/*.html")
		.pipe(gulp.dest("build"))
});

gulp.task("js", function() {
	return gulp.src("src/js/*.js")
		.pipe(gulp.dest("build/js"))
});

gulp.task("sass", function() {
	return gulp.src("src/style/*.scss")
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(prefixer({
			overrideBrowserslist: ["last 10 versions"],
			cascade: false
		}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest("build/style"))
});

gulp.task("build", gulp.series("html", "sass", "js"));

gulp.task("watch", function(){
   gulp.watch("src/style/*.*", gulp.series("sass"))
   gulp.watch("src/js/*.*", gulp.series("js"))
   gulp.watch("src/**/*.html", gulp.series("html"))
});

gulp.task("dev", gulp.series("build", "watch"));