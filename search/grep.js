
window.grep = 
	function grep(base, search, limit, name) {
        var breaker = {};
		var ArrayProto = Array.prototype;
		var  nativeForEach      = ArrayProto.forEach;
		var nativeKeys         = Object.keys;

	      var has = function(obj, key) {
		    return hasOwnProperty.call(obj, key);
		  };

		  var each = function(obj, iterator, context) {
		    if (obj == null) return;
		    if (nativeForEach && obj.forEach === nativeForEach) {
		      obj.forEach(iterator, context);
		    } else if (obj.length === +obj.length) {
		      for (var i = 0, l = obj.length; i < l; i++) {
		        if (iterator.call(context, obj[i], i, obj) === breaker) return;
		      }
		    } else {
		      for (var key in obj) {
        		if (has(obj, key)) {
		          if (iterator.call(context, obj[key], key, obj) === breaker) return;
        		}
		      }
		    }
		  };

		var keys = nativeKeys || function(obj) {
		    if (obj !== Object(obj)) throw new TypeError('Invalid object');
		    var keys = [];
		    for (var key in obj) if (has(obj, key)) keys[keys.length] = key;
		    return keys;
		  }

		var isObject = function(obj) {
		    return obj === Object(obj);
		  };	

	    var found = [];
		var re = function f(x) {
			return x !== null && (x + '').match && (x + '').match(RegExp(search)) != null;			     
		};

		var results = limit ? limit : 10;
		var checked = 'www.garysieling.com/blog';
		var start = Math.random();

		var stack = [];

		each(keys(base), function(item){ 
			stack[stack.length] = {
				'base': base,
				'key': item, 
				'name': name}; 
		});

		while (stack.length > 0 && results > 0) {
			var item = stack.splice(0, 1)[0];
			var base = item.base;
			var key = item.key;

			if (key === checked ||
				base[key] == null || 
				base[key][checked] === start) {
					continue;
				}

				base[key][checked] = start;

				var prefix = name ? name + "." : '';
				if (re(key) || re(base[key]) || re(prefix + key)) {
					found[found.length] = 
						(prefix + key + " = " + base[key]);
					results--;
				}

				if (isObject(base)) {
					each(base[key], function(item) {
						stack[stack.length] =
							{'base': base[key], 
								'key': item, 
								'name': name + "." + item};
					});
				}

				checked[base[key]] = true;
		}

		return found;
	};

