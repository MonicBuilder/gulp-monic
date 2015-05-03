/*!
 * gulp-monic
 * https://github.com/MonicBuilder/gulp-monic
 *
 * Released under the MIT license
 * https://github.com/MonicBuilder/gulp-monic/blob/master/LICENSE
 */

var
	through = require('through2'),
	PluginError = require('gulp-util').PluginError,
	applySourceMap = require('vinyl-sourcemaps-apply'),
	monic = require('monic');

module.exports = function (opts) {
	opts = opts || {};

	opts.cwd = process.cwd();
	opts.saveFiles = false;

	function compile(file, enc, cb) {
		if (file.isStream()) {
			return cb(new PluginError('gulp-monic', 'Streaming not supported'));
		}

		if (file.isBuffer()) {
			opts.content =
				String(file.contents);

			opts.sourceMaps =
				Boolean(file.sourceMap);

			monic.compile(file.path, opts, function (err, data, sourceMap) {
				if (err) {
					return cb(new PluginError('gulp-monic', err.message));
				}

				if (sourceMap) {
					applySourceMap(file, sourceMap.map);
				}

				file.contents = new Buffer(data);
				cb(null, file);
			});
		}
	}

	return through.obj(compile);
};
