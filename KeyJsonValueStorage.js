
/**
 * Wraps another storage to allow storing arbitrary JSON-compatible values.
 * 
 * @param storage the wrapped storage
 */
KeyJsonValueStorage = function(storage) {
	
	this.set = function(key, value, callback) {
		storage.set(key, JSON.stringify(value), callback);
	}
	
	this.get = function(key, callback) {
		storage.get(key, function(encoded) {
			if (callback) {
				callback(JSON.parse(encoded));
			}
		});
	}
	
	this.remove = function(key, callback) {
		storage.remove(key, callback);
	}
	
};
