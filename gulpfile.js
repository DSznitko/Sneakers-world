const {src, dest, series}  = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cssnano = require('gulp-cssnano');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');


function sassCompiler(done) {
  src('./src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(cssnano())
    .pipe(dest('./dist/css'));

    done()
}

function javaScript(done) {
  src('./src/js/**/*.js')
  .pipe(babel({
      presets: ['@babel/env']
  }))
  .pipe(uglify())
  .pipe(dest('./dist/js'))


  done()
}

exports.default = series(sassCompiler, javaScript)