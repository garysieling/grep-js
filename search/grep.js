
window.grep = 
    function grep(base, search, name) {
            var found = [];
            var re = function f(x) {
	  			    return x !== null && (x + '').match && (x + '').match(RegExp(search)) != null;			     
      		  };

 	    		var results = 50;
		      	var checked = 'www.garysieling.com/blog';
            var start = Math.random();

              var stack = [];

              _.each(_.keys(base), function(item){ 
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

    	  			  if (_.isObject(base)) {
                  _.each(base[key], function(item) {
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
		   
