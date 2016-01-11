
/**
 * Stores string values in memory.
 */
InMemoryKeyValueStorage = function() {
	
	//
	// helpers
	//
	
	var data = {};
	
	function done(callback) {
		if (callback) {
			setTimeout(callback, 0);
		}
	}
	
	function doneWith(callback, value) {
		if (callback) {
			setTimeout(function() {
				callback(value);
			}, 0);
		}
	}
	
	//
	// actual functionality
	//
	
	this.set = function(key, value, callback) {
		if (typeof value != 'string') {
			throw 'this storage can only store string values, found: ' + (typeof value);
		}
		data[key] = value;
		done(callback);
	}
	
	this.get = function(key, callback) {
		doneWith(callback, data[key]);
	}
	
	this.remove = function(key, callback) {
		delete data[key];
		done(callback);
	}
	
};
