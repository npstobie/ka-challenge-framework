var acorn = require("acorn");

module.exports.testText = function(obj){
	var results = {
		whiteList:{},
		blackList:{},
		structure: {}
	}
	var parsedJS = acorn.parse(obj.text);
	console.log(parsedJS);
	for (var key in obj.checks) {
		if (key === "whiteList") {
			for (var type in obj.checks[key]) {
				if (obj.checks[key][type] === "true") {
					results.whiteList[type] = tests[type](parsedJS);
				}
			}
		} else if (key === "blackList") {
			for (var type in obj.checks[key]) {
				if (obj.checks[key][type] === "true") {
					results.blackList[type] = !tests[type](parsedJS);
				}
			}
		}
	}
	console.log("HI", results);
	return results;
}

var tests = {
	forLoop: function forLoopCheck(parsedJS) {
		var body = parsedJS.body
		for (var i=0; i<body.length; i++) {
			if (body[i].type === "ForStatement") {
				return true;
			}
		}
		return false;
	},
	ifStatement: function ifCheck(parsedJS){
		var body = parsedJS.body
		for (var i=0; i<body.length; i++) {
			if (body[i].type === "IfStatement") {
				return true;
			}
		}
		return false;
	},
	whileLoop: function whileLoopCheck(parsedJS) {
		var body = parsedJS.body
		for (var i=0; i<body.length; i++) {
			if (body[i].type === "WhileStatement") {
				return true;
			}
		}
		return false;	
	},
	varDeclaration: function varCheck(parsedJS) {
		var body = parsedJS.body
		for (var i=0; i<body.length; i++) {
			if (body[i].type === "VariableDeclaration") {
				return true;
			}
		}
		return false;
	},
	functionDeclaration: function functionCheck(parsedJS) {
		var body = parsedJS.body
		for (var i=0; i<body.length; i++) {
			if (body[i].type === "FunctionDeclaration") {
				return true;
			}
		}
		return false;
	}
}; 