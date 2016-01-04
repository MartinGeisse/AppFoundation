
/**
 * Stores string values in local storage, prepending the specified prefix
 * before each key.
 * 
 * @param prefix the prefix to prepend to each key
 */
function LocalStorageKeyValueStorage(prefix) {
	
	//
	// helpers
	//
	
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
		localStorage.setItem(prefix + key, value);
		done(callback);
	}
	
	this.get = function(key, callback) {
		doneWith(callback, localStorage.getItem(prefix + key));
	}
	
	this.exists = function(key, callback) {
		doneWith(callback, localStorage.getItem(prefix + key) !== null);
	}
	
	this.remove = function(key, callback) {
		localStorage.removeItem(prefix + key);
		done(callback);
	}
	
}
