
window.grep = 
	function grep(base, search, limit, begin, log) {
      if (log) console.log("Search : " + search);
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

		if (log) console.log("Base object " + (isArray(base) ? "is array" : "is not array"));

  var combine = function(name, item, isarray) {
       return isarray ? (name + "[" + item + "]") :
                        (name + "." + item);
    };


		each(keys(base), function(item){ 
			if (log) console.log("Processing key " + item );
			var key = isArray(base) ? (name + "[" + index++ + "]") : item;

      if (!begin) begin = '';
    
			stack[stack.length] = {
				'base': base,
				'key': item, 
        'array': isArray(base),
				'name': combine(begin, item, isArray(base))}; 
     });

   
		while (stack.length > 0 && results > 0) {
      if (log) console.log("Stack size: " + stack.length);
			var item = stack.splice(0, 1)[0];
			var base = item.base;
			var key = item.key;
			var name = item.name;
			var array = item.array;
      
      if (log) console.log(JSON.stringify(item));

			if (key === checked ||
				base[key] == null || 
				base[key][checked] === start) {
					if (log) console.log("Skipping " + name + "." + key );

					continue;
				}

				base[key][checked] = start;

				if (isArray(base[key])) {
					if (log) console.log("Processing array " + name + "." + key );

					for (var i = 0; i < base[key].length; i++) {
						stack[stack.length] =
							{'base': base[key], 
								'key': i, 
                'array': true,
								'name': name + "[" + i + "]"};

						if (log) console.log(stack[stack.length-1]);
					}

					continue;
				} else {
					if (log) console.log("Testing " + key);
					if (log) console.log("Testing " + base[key]);
					if (log) console.log("Testing " + begin + "." + name);

          if (re(key) || re(base[key]) || re(begin + "." + name)) {
						if (log) console.log("Found " + name + "." + key + "("+array+")" );

						var lvalue = 
                 (begin ? '' : 'obj') + name;

						found[found.length] = 
							(lvalue + " = " + base[key]);
						results--;
					}

					if (isObject(base[key])) {
						if (log) console.log("Processing Object " + name + "." + key );

						each(keys(base[key]), function(item) {
							stack[stack.length] =
								{'base': base[key], 
									'key': item, 
                  'array': isArray(base),                    
									'name': combine(name, item, isArray(base))};
						});
					}
				}
			

				checked[base[key]] = true;
		}

		return found;
	};

window.assert = function(value, test) {
        if (value) console.log(test +": Passed");
        else console.log(test + ": Failed");
}

window.assertEqual = function(key, desired, test) {
        var value = (key===desired);
        
        if (value) console.log(test +": Passed");
        else console.log(test + ": Failed (" + desired + " <> " + key + ")");
}

function testTopLevelArray() {
  var obj = ["a", "b", "C"];
  var result = grep(obj, "C", 1)[0];
  assertEqual(result, "obj[2] = C", "testTopLevelArray");
}
testTopLevelArray();

function testSubArray() {
  var obj = {d: ["a", "b", "C"]};
  var result = grep(obj, "C", 1, "obj", false)[0];
  assertEqual(result, "obj.d[2] = C", "testSubLevelArray");
}
testSubArray();

function testInt() {
  var obj = {d: 56};
  var result = grep(obj, "56")[0];
  assertEqual(result, "obj.d = 56", "testInt");
}
testInt();

function testString() {
  var obj = {d: 'test'};
  var result = grep(obj, "test")[0];
  assertEqual(result, "obj.d = test", "testString");
}
testString();

function testRecursion() {
  var obj = {d: ""};
  obj.d = obj;
  var result = grep(obj, "obj")[0];
  assertEqual(result, "obj.d = [object Object]", "testRecursion");
}
testRecursion();

function testObject() {
  var obj = {d: {a: "b"}};
  var result = grep(obj, "d")[0];

  assertEqual(result, "obj.d = [object Object]", "testObject");
}
testObject();

function testSubObject() {
  var obj = {d: {a: "test"}};
  var result = grep(obj, "a", 1, "obj", false)[0];

  assertEqual(result, "obj.d.a = test", "testSubObject");
}
testSubObject();


function testFunction() {
  var obj = {d: {a: function(){ return "test" } }};
  var result = grep(obj, "test", 1, "obj", false)[0];

  assertEqual(result, "obj.d.a = function () { return \"test\"; }", "testFunction");
}
testFunction();


function testWindow() {
  var result = grep(window, top)[0];

  assert(result, "testWindow");
}
testWindow();

phantom.exit();
