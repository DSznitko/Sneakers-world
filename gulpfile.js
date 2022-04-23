const {src, dest, series}  = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cssnano = require('gulp-cssnano');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const sourcemaps = require('gulp-sourcemaps');


function sassCompiler(done) {
  src('./src/sass/**/*.scss')
  .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(cssnano())
    .pipe(sourcemaps.write())
    .pipe(dest('./dist/css'));

    done()
}

function javaScript(done) {
  src('./src/js/**/*.js')
  .pipe(sourcemaps.init())
  .pipe(babel({
      presets: ['@babel/env']
  }))
  .pipe(uglify())
  .pipe(sourcemaps.write())
  .pipe(dest('./dist/js'))


  done()
}

function converteImgs(done) {
  src('./src/img/*')
 .pipe(imagemin())
  .pipe(dest('./dist/img'))


  done()
}

exports.default = series(sassCompiler, javaScript, converteImgs)