define([
    "text!search/template.html"
    ,"css!search/todos.css",
], function(template) {
    "use strict";

    var exports = {};


    exports.GrepView = Backbone.View.extend({

        events: {
            'click [data-wspt="search-submit"]': 'submit',
            'change [data-wspt="search-text"]': 'submit'
        },

        initialize: function(options) {
            var self = this;

            self.$el.html(template);

            self.todoItemSnippet = this.$el.find('[data-wspt="todo-item"]');
            self.todoListContainer = this.$el.find('[data-wspt="todo-list"]');
        },

        render: function() {
            var self = this;

            self.todoListContainer.html("");
        },

        submit: function(e) {
          var self = this;
          var search = self.$el.find('[data-wspt="search-text"]').val();

			    //console.log(search);
    			$(".console")[0].innerHTML = '';

		    	var re = function f(x) {
				    return x !== null && (x + '').match && (x + '').match(RegExp(search)) != null;			     
    		  };
			
  	  		var results = 50;
		    	var checked = 'test12345';
          var start = Math.random();

    			var ex = function (name, base) {
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

  	  				if (re(key) || re(base[key]) || re(name + "." + key)) {
			  		  	console.log(name + "." + key + " = " + base[key]);
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
        }
		    ex("this", this);
		    ex("arguments", arguments);
		    ex("window", window);
      }
    });

    return exports;
});

