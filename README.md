grep-js
=======

Inspired by a client project with thousands of lines of poorly structured, badly written ExtJS code, I wrote a grep implementation to recursively search the contents of Javascript variables.

This provides a single function "grep" in the global namespace. It recursively searches objects (keys, values, arrays and functions) for values matching a regular expression. It does a breadth-first search, stopping after a number of entries. Currently, it returns a stringified version of the variable name and value, so you can see exactly what you'd need to write to get the desired value. e.g:

var lib = ...contents of grep.js...

lib.test();

testTopLevelArray: Passed
testSubLevelArray: Passed
testInt: Passed
testString: Passed
testRecursion: Passed
testObject: Passed
testSubObject: Passed
testFunction: Passed
testWindow: Passed
testRemoveTopLevel: Passed
testRemoveTopLevel: Passed
testRemoveSecondLevel: Passed
testRemoveSecondLevel: Passed
testKeys: Failed (b <> obj.a)
testValues: Failed (c <> [object Object])

*lib.install();*
*grep("window", "location")*
_[Object, Object, Object, Object, Object, Object, Object, Object, Object, Object]_

*grep("document", "location").keys()*
_["document.location", "document.location.assign", "document.location.replace", "document.location.reload", "document.location.ancestorOrigins", "document.location.origin", "document.location.hash", "document.location.search", "document.location.pathname", "document.location.port", ""]_

*grep("document", "location$").keys();*
_["document.location", "document.defaultView.location", "document.activeElement.ownerDocument.location", "document.head.ownerDocument.location", "document.body.ownerDocument.location", "document.defaultView.top.location", "document.defaultView.window.location", "document.defaultView.document.location", "document.defaultView.Modernizr.geolocation", "document.documentElement.classList.7", ""]_

*grep("document", "location$").values()*
_["https://github.com/garysieling/grep-js/blob/master/search/grep.js", "https://github.com/garysieling/grep-js/blob/master/search/grep.js", "https://github.com/garysieling/grep-js/blob/master/search/grep.js", "https://github.com/garysieling/grep-js/blob/master/search/grep.js", "https://github.com/garysieling/grep-js/blob/master/search/grep.js", "https://github.com/garysieling/grep-js/blob/master/search/grep.js", "https://github.com/garysieling/grep-js/blob/master/search/grep.js", "https://github.com/garysieling/grep-js/blob/master/search/grep.js", "true", "geolocation", ""]_

http://www.garysieling.com/blog
