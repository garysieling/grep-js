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
 

        },

        render: function() {
            var self = this;

            self.todoListContainer.html("");
        },

        submit: function(e) {
          var self = this;
          var search = self.$el.find('[data-wspt="search-text"]').val();

    			$(".console")[0].innerHTML = '';

          grep("this", this, search);
		      grep("arguments", arguments, search);
		      grep("window", window, search);
        }
    });
 
});

