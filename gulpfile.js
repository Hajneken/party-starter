const gulp = require('gulp');

// SASS Watchter
const sass = require('gulp-sass');

// Server with reload
const browserSync = require('browser-sync').create();

// JavaScript
const babel = require('gulp-babel');

// Minification
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
let cleanCSS = require('gulp-clean-css');


function style(){
    return gulp.src('./resources/scss/main.scss')
        .pipe(sass()).pipe(gulp.dest('./app/css/'))
        .pipe(browserSync.stream());
}

// watch for changes and update automatically
function watch(){
    browserSync.init({
        server: {
            baseDir: './app'
        }
    });
    gulp.watch('./resources/scss/**/*.scss', style);
    gulp.watch('./resources/index.html').oyn('change', browserSync.reload);
    gulp.watch('./resources/js/*.js').on('change', browserSync.reload);
}


gulp.task("babel", function () {
    return gulp.src("./resources/js/index.js")
        .pipe(babel())
        .pipe(gulp.dest("./app/js"));
});


gulp.task('imgMin', () =>
    gulp.src('./resources/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./app/img'))
);

gulp.task('minify', () => {
    return gulp.src('./resources/index.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('./app'));
});

gulp.task('minify-css', () => {
    return gulp.src('./app/css/*.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('./app/css'));
});

gulp.task('party', gulp.series('babel', 'imgMin', 'minify', 'minify-css'));

exports.style = style;
exports.watch = watch;



