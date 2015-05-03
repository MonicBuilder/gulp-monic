var
	through = require('through2'),
	PluginError = require('gulp-util').PluginError,
	applySourceMap = require('vinyl-sourcemaps-apply'),
	monic = require('monic');

module.exports = function (opts) {
	opts = opts || {};
	opts.cwd = process.cwd();

	function compile(file, enc, cb) {
		if (file.isStream()) {
			return cb(new PluginError('gulp-monic', 'Streaming not supported'));
		}

		if (file.isBuffer()) {
			opts.content = String(file.contents);
			monic.compile(file.path, opts, function (err, data, sourceMap) {
				if (err) {
					return cb(new PluginError('gulp-monic', err.message));
				}

				if (file.sourceMap && sourceMap) {
					applySourceMap(file, sourceMap.map);
				}

				file.contents = new Buffer(data);
				cb(null, file);
			});
		}
	}

	return through.obj(compile);
};
