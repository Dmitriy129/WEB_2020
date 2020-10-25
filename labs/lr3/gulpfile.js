const gulp = require('gulp')
const less = require('gulp-less')
const cssmin = require('gulp-cssmin')
const sourcemaps = require('gulp-sourcemaps')
const babel = require('gulp-babel')
const strip = require('gulp-strip-comments')

const lessBuild = () =>
    gulp.src('./front/src/less/**/*.less')
        .pipe(sourcemaps.init())
        .pipe(less().on('error', (err) => console.log(err)))
        .pipe(cssmin().on('error', (err) => console.log(err)))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./front/public/css'));

const jsBuild = () =>
    gulp.src('front/src/script/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(sourcemaps.write('.'))
        .pipe(strip())
        .pipe(gulp.dest('./front/public/script'));

const copy = (from, to) =>
    gulp.src(from)
        .pipe(gulp.dest(to));


gulp.task('less', lessBuild);
gulp.task('js', jsBuild);
gulp.task('img', () => copy('./front/src/img/*', './front/public/img'));
gulp.task('savedImg', () => copy('./front/src/savedImg/*', './front/public/savedImg'));
gulp.task('fonts', () => copy('./front/src/fonts/*', './front/public/fonts'));

gulp.task('watch', function () {
    gulp.watch('front/src/script/**/*.js', gulp.series('js'));
    gulp.watch('front/src/less/**/*.less', gulp.series('less'));
});

gulp.task('default', gulp.series('less', 'js', 'img', 'savedImg', 'fonts'));



module.exports = { lessBuild, jsBuild }
