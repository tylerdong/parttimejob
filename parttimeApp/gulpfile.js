// place code for your default task here
const gulp = require('gulp');
const postcss = require('gulp-postcss');
const pxtoviewport = require('postcss-px-to-viewport');
const path = require('path');

const DEST = './parttimeApp';

/*--------------------分隔线---------------------*/

exports.default = function () {
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
}