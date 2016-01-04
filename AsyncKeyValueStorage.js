
/**
 * Base implementation of an asynchronous key/value storage. This constructor
 * takes an engine that works similar to storage objects themselves, except that
 * the engine will never be called for the same key while another operation for
 * the same key is still in progress.
 * 
 * This storage doesn't impose any restriction on stored values, but inherits
 * any restrictions from the wrapped storage.
 * 
 * @param storage the wrapped storage
 */
AsyncKeyValueStorage = function(storage) {

	//
	// helpers
	//
	
	var queues = {};

	function work(key, unit) {
		unit(function() {
			if (!(key in queues)) {
				// shouldn't happen, but still nothing to do
			} else if (queues[key].length == 0) {
				delete queues[key];
			} else {
				work(key, queues[key].shift());
			}
		});
	}
	
	function enqueue(key, unit) {
		if (key in queues) {
			queues[key].push(unit);
		} else {
			queues[key] = [];
			work(key, unit);
		}
	}
	
	//
	// actual functionality
	//
	
	this.set = function(key, value, callback) {
		enqueue(key, function(furtherWork) {
			storage.set(key, value, function() {
				furtherWork();
				callback();
			});
		});
	}
	
	this.get = function(key, callback) {
		enqueue(key, function(furtherWork) {
			storage.get(key, function(value) {
				furtherWork();
				callback(value);
			});
		});
	}
	
	this.exists = function(key, callback) {
		enqueue(key, function(furtherWork) {
			storage.exists(key, function(result) {
				furtherWork();
				callback(result);
			});
		});
	}
	
	this.remove = function(key, callback) {
		enqueue(key, function(furtherWork) {
			storage.remove(key, function() {
				furtherWork();
				callback();
			});
		});
	}
	
}
