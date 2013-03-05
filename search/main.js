require([
    "search/view"
    ,"css!lib/stylesheets/bootstrap.css"
], function(view) {
    "use strict";

    var myView = new view.GrepView({
    });

    $("#root").html(myView.$el);
});

