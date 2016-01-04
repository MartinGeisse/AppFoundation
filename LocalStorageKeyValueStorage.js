
/**
 * Stores string values in local storage.
 */
function LocalStorageKeyValueStorage() {
	
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
		localStorage.setItem(key, value);
		done(callback);
	}
	
	this.get = function(key, callback) {
		doneWith(callback, localStorage.getItem(key));
	}
	
	this.exists = function(key, callback) {
		doneWith(callback, localStorage.getItem(key) !== null);
	}
	
	this.remove = function(key, callback) {
		localStorage.removeItem(key);
		done(callback);
	}
	
}
