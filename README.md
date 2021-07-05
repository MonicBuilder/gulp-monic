[gulp](http://gulpjs.com)-monic
===============================

Using [Monic](https://github.com/MonicBuilder/Monic) with Gulp.

[![NPM version](http://img.shields.io/npm/v/gulp-monic.svg?style=flat)](http://badge.fury.io/js/gulp-monic)
[![NPM dependencies](http://img.shields.io/david/MonicBuilder/gulp-monic.svg?style=flat)](https://david-dm.org/MonicBuilder/gulp-monic)
[![NPM devDependencies](http://img.shields.io/david/dev/MonicBuilder/gulp-monic.svg?style=flat)](https://david-dm.org/MonicBuilder/gulp-monic?type=dev)
[![NPM peerDependencies](http://img.shields.io/david/peer/MonicBuilder/gulp-monic.svg?style=flat)](https://david-dm.org/MonicBuilder/gulp-monic?type=peer)

## Install

```bash
npm install monic gulp-monic --save-dev
```

## Usage

**gulpfile.js**

```js
var gulp = require('gulp'),
    monic = require('gulp-monic');

gulp.task('monic', function () {
  gulp.src('./myFile.js')
    .pipe(monic({flags: {ie: true}}))
    .pipe(gulp.dest('./public/js'));
});

gulp.task('default', ['monic']);
```

## [Options](https://github.com/MonicBuilder/Monic#using-in-nodejs)
## [License](https://github.com/MonicBuilder/gulp-monic/blob/master/LICENSE)

The MIT License.
