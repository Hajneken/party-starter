const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const htmlmin = require('gulp-htmlmin');

// compile SCSS into css

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
    gulp.watch('./*.html').on('change', browserSync.reload);
    gulp.watch('./resources/js/*.js').on('change', browserSync.reload);
}

gulp.task('minify', () => {
    return gulp.src('./resources/index.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('./app'));
});

exports.style = style;
exports.watch = watch;



