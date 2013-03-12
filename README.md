grep-js
=======

Inspired by a client project with thousands of lines of poorly structured, badly written ExtJS code, I wrote a grep implementation to recursively search the contents of Javascript variables.

This provides a single function "grep" in the global namespace. It recursively searches objects (keys, values, arrays and functions) for values matching a regular expression. It does a breadth-first search, stopping after a number of entries. Currently, it returns a stringified version of the variable name and value, so you can see exactly what you'd need to write to get the desired value. e.g:

http://www.garysieling.com/blog
