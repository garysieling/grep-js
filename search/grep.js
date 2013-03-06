
window.grep = 
	function grep(base, search, limit, begin) {
        var breaker = {};
		var ArrayProto = Array.prototype;
		var  nativeForEach      = ArrayProto.forEach;
		var nativeKeys         = Object.keys;
        var nativeIsArray      = Array.isArray;

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
		
		  var isArray = nativeIsArray || function(obj) {
		    return toString.call(obj) == '[object Array]';
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

		var index = 0;
		console.log("Base object " + (isArray(base) ? "is array" : "is not array"));
		each(keys(base), function(item){ 
			var key = isArray(base) ? (name + "[" + index++ + "]") : item;

			stack[stack.length] = {
				'base': base,
				'key': item, 
				'name': key}; 
		});

		while (stack.length > 0 && results > 0) {
			var item = stack.splice(0, 1)[0];
			var base = item.base;
			var key = item.key;
			var name = item.name;

			if (key === checked ||
				base[key] == null || 
				base[key][checked] === start) {
					continue;
				}

				base[key][checked] = start;

				console.log("Testing " + key + " " + (isArray(base[key]) ? " which is an array" : "which is not an array"));
				if (isArray(base[key])) {
					for (var i = 0; i < base[key].length; i++) {
						stack[stack.length] =
							{'base': base[key], 
								'key': i, 
								'name': name + "." + key + "[" + i + "]"};

						console.log(stack[stack.length-1]);
					}

					continue;
				} else {
					if (re(key) || re(base[key]) || re(begin + "." + key)) {
						var prefix = begin ? begin + "." : 'obj.';
					    
						found[found.length] = 
							('`' + prefix + '`' + name + " = " + base[key]);
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
				}
			

				checked[base[key]] = true;
		}

		return found;
	};

