const {src, dest, series, parallel, watch}  = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cssnano = require('gulp-cssnano');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;

const paths = {
  sass: "./src/sass/**/*.scss",
  js: "./src/js/**/*.js",
  img: "./src/img/*",
  sassDest: "./dist/css",
  jsDest: "./dist/js",
  imgDest: "./dist/img"
}


function sassCompiler(done) {
  src(paths.sass)
  .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(cssnano())
    .pipe(sourcemaps.write())
    .pipe(dest(paths.sassDest));

    done()
}

function javaScript(done) {
  src(paths.js)
  .pipe(sourcemaps.init())
  .pipe(babel({
      presets: ['@babel/env']
  }))
  .pipe(uglify())
  .pipe(sourcemaps.write())
  .pipe(dest(paths.jsDest))


  done()
}

function converteImgs(done) {
  src(paths.img)
 .pipe(imagemin())
  .pipe(dest(paths.imgDest))


  done()
}


function startBrowserSync(done) {
  browserSync.init({
    server: {
        baseDir: "./"
    }
});


  done()
}


function watchForChanges(done) {
 
watch("./*.html").on("change", reload);
watch([paths.sass, paths.js], parallel(sassCompiler, javaScript)).on("change", reload);
watch(paths.img, converteImgs).on("change", reload);

  done()
}

const mainFunctions = parallel(sassCompiler, javaScript, converteImgs)
exports.default = series(mainFunctions, startBrowserSync, watchForChanges)