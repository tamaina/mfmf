const gulp = require('gulp');
const mocha = require('gulp-mocha');

gulp.task('default', () =>
    gulp.src('./test/**/*.ts')
        .pipe(mocha({
            exit: true,
            require: 'ts-node/register'
        }))
);