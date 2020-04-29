// place code for your default task here
const gulp = require('gulp');
const postcss = require('gulp-postcss');
const pxtoviewport = require('postcss-px-to-viewport');
const path = require('path');

const DEST = './parttimeApp';


gulp.task('css', function () {
    const processors = [pxtoviewport({
        viewportWidth: 1920,
        viewportHeight: 562,
        unitPrecision: 5,
        propList: ['*'],
        viewportUnit: 'vw',
        fontViewportUnit: 'vw',
        selectorBlackList: [],
        minPixelValue: 1,
        mediaQuery: false,
        replace: false,
        exclude: [],
        landscape: false,
        landscapeUnit: 'vw',
        landscapeWidth: 568
    })]

    return gulp.src(['stylesheets/build/*.css'])
        .pipe(postcss(processors))
        .pipe(gulp.dest(path.join('stylesheets/dist')))
})

/*--------------------分隔线---------------------*/
const {src, dest} = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

exports.default = function () {
    return src('src/script/*.js')
        .pipe(dest('src/script/output/'));
}

exports.default = function() {
    return src('src/script/*.js')
        .pipe(babel())
        .pipe(src('src/script/vendor/*.js'))
        .pipe(uglify())
        .pipe(dest('src/script/output/'));
}