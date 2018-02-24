'use strict';

/*!
 * gulp-monic
 * https://github.com/MonicBuilder/gulp-monic
 *
 * Released under the MIT license
 * https://github.com/MonicBuilder/gulp-monic/blob/master/LICENSE
 */

const
	through = require('through2'),
	PluginError = require('plugin-error'),
	applySourceMap = require('vinyl-sourcemaps-apply'),
	monic = require('monic');

module.exports = function (opts) {
	opts = opts || {};

	opts.cwd = process.cwd();
	opts.saveFiles = false;

	function compile(file, ignore_enc, cb) {
		if (file.isStream()) {
			return cb(new PluginError('gulp-monic', 'Streaming not supported'));
		}

		if (file.isBuffer()) {
			opts.content =
				String(file.contents);

			opts.sourceMaps =
				Boolean(file.sourceMap);

			monic.compile(file.path, opts, (err, data, sourceMap) => {
				if (err) {
					return cb(new PluginError('gulp-monic', err));
				}

				if (sourceMap) {
					applySourceMap(file, sourceMap.map);
				}

				file.contents = Buffer.from(data);
				cb(null, file);
			});
		}
	}

	return through.obj(compile);
};
