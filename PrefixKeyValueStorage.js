
/**
 * Wraps another storage to prepend a prefix to each key.
 * 
 * @param storage the wrapped storage
 * @param prefix the prefix to prepend
 */
PrefixKeyValueStorage = function(storage, prefix) {
	
	this.set = function(key, value, callback) {
		storage.set(prefix + key, value, callback);
	}
	
	this.get = function(key, callback) {
		storage.get(prefix + key, callback);
	}
	
	this.exists = function(key, callback) {
		storage.exists(prefix + key, callback);
	}
	
	this.remove = function(key, callback) {
		storage.remove(prefix + key, callback);
	}
	
};
