// var rndseed = 2;
// function rnd(min, max) {
// 	if (max == undefined) {
// 		max = min;
// 		min = 0;
// 	}
// 	rndseed = ((rndseed * 134775813) + 1) % 4294967296;
// 	return Math.floor(rndseed / 4294967296 * (max - min) + min);
// }
function rnd(max) {
	return Math.floor(Math.random() * max)
}
Object.prototype.sample = function() {
	return this[ rnd(this.length) ]
}
function generateFunctionBody() {
	function e_variable(level) {
		return available_variables.sample(level)
	}
	function e_arithmetic_operator(level) {
		return expression(level) + OPERATORS.sample() + expression(level)
	}
	function e_bool_operator(level) {
		return expression(level) + BOOL_OPERATORS.sample() + expression(level)
	}
	function e_parenthesis(level) {
		return '(' + expression(level) + ')'
	}
	function expression(level) {
		if (level > 3) {
			return e_variable()
		}
		return EXPRESSIONS.sample()((level || 0) + 1)
	}
	function bool_expression() {
		return BOOL_EXPRESSIONS.sample()()
	}
	function c_var() {
		var varname = 'v' + (available_variables.length + 1)
		var s = 'var ' + varname + ' = ' + expression() + ';\n'
		available_variables.push(varname)
		return s
	}
	function c_if() {
		return 'if (' + bool_expression() + ') {\n' + block() + '}\n'
	}
	function c_return() {
		return 'return ' + expression() + ';\n'
	}
	function block() {
		var s = ''
		for (var i = 0; i < 5; i++) {
			var command = COMMANDS.sample()
			s += command()
			if (command == c_return) {
				return s
			}
		}
		return s + c_return()
	}
	var COMMANDS = [c_var, c_if, c_return]
	var OPERATORS = ['+','-','/','*']
	var BOOL_OPERATORS = ['>','<','==']
	var EXPRESSIONS = [e_variable, e_arithmetic_operator, e_parenthesis]
	var BOOL_EXPRESSIONS = [e_variable, e_bool_operator]
	var s = ''
	var available_variables = ['a', 'b']
	s += block()
	return s
}
function generateFunction() {
	return 'var _func = function(a, b){\n'+generateFunctionBody()+'}'
}
function assertEqual(expected, actual){
	if (expected !== actual) {
		throw "Assertation error: expected '" + expected + "', but got '" + actual + "'"
	}
}

function runSpecs_add(f) {
	//return a + b
	assertEqual(3, f(1, 2))
	assertEqual(30, f(10, 20))
	assertEqual(0, f(-100, 100))
}
function runSpecs_min(f) {
	//if (a < b) {return a} return b
	assertEqual(1, f(1, 2))
	assertEqual(10, f(10, 20))
	assertEqual(5, f(10, 5))
	assertEqual(100, f(100, 100))
}
function loop() {
	while (true) {
		try {
			var p = generateFunction()
			console.log(p)
			eval(p)
			runSpecs_min(_func)
			console.log('\n\nSOLUTION:\n')
			console.log(p)
			return
		} catch (e) {
			console.error(e)
		}
	}
}

loop()
