Genetic programming
===================

What
----

A proof of concept that it is possible to satisfy tests (specifications) of a function
just by trying to write random commands.

Why
---

I have an idea in my head since long time: I write only the tests for the application I'd
like to have, and somebody else will implement it. If the expectations are good enough,
than it is possible to hire a cheap programmer to implement the app, and the application
will still be good enough.

This project is the next logical step, since computers are cheaper than programmers...

How it works
---

It is expecting to find out the implementation of a single function, by
randomly generating commands (as the function body), until it satisfies all specs.

Yes, the `genetic` part is not there yet :)

Example
-------

If the specs are these (describing the `min` function):

	assertEqual(1, f(1, 2))
	assertEqual(10, f(10, 20))
	assertEqual(5, f(10, 5))
	assertEqual(100, f(100, 100))

Then we might get something like this as a result:

	var f = function(a, b){
	var v3 = a;
	var v4 = (b);
	if (v4) {
	if (((v4))<a) {
	return v4;
	}
	return ((((v3))));
	}
	var v5 = (v4)/v4;
	return b;
	}

The output is not formatted yet, so it is not easy to read.
Also it handles only a very few commands: `var`, `if` and `return`.
And the generated code might have unused parts, like `v5` in the above code.

This is also an example of a wrong implementation, since if the second parameter
is 0, than it always returns 0. So the specs need to be more extensive.

Usage
-----

Type

	$ node test.js

and wait for the magic :D

Currently the specs are hard coded in the source.

Inspired by
----

The following Hacker News article: [XKCD-inspired StackSort](https://news.ycombinator.com/item?id=5395463)
