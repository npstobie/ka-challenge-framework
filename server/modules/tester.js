var acorn = require("acorn");

module.exports.testText = function(obj){
	var results = {
		whiteList:{},
		blackList:{},
		structure: {}
	}
	var parsedJS = acorn.parse(obj.text);
	for (var key in obj.checks) {
		if (key === "whiteList") {
			for (var type in obj.checks[key]) {
				if (obj.checks[key][type] === "true") {
					var result = tests[type](parsedJS);
					results.whiteList[type] = result.truth;
				}
			}
		} else if (key === "blackList") {
			for (var type in obj.checks[key]) {
				if (obj.checks[key][type] === "true") {
					var result = tests[type](parsedJS);
					results.blackList[type] = !result.truth;
				}
			}
		} 
		else if (key === "structure") {
			 results.structure = structureCheck(obj.checks[key]);
		}
	}
	return results;
}

function structureCheck(structure, parsedJS) {
	var structure = {};
	function structureLayerCheck(obj){
		for (var key in obj) {
			if (typeof obj[key] === "object"){
					if (tests[key](parsedJS) === true) {

					}
			} else {
				structure[key] = tests[key](parsedJS);
			}
		}
	}
	structureLayerCheck(structure);

}

var tests = {
	forLoop: function forLoopCheck(parsedJS) {
		var body = parsedJS.body
		for (var i=0; i<body.length; i++) {
			if (body[i].type === "ForStatement") {
				return {truth: true, body: body[i]};
			}
		}
		return {truth: false, body: body[i]};
	},
	ifStatement: function ifCheck(parsedJS){
		var body = parsedJS.body
		for (var i=0; i<body.length; i++) {
			if (body[i].type === "IfStatement") {
				return {truth: true, body: body[i]};
			}
		}
		return {truth: false, body: body[i]};
	},
	whileLoop: function whileLoopCheck(parsedJS) {
		var body = parsedJS.body
		for (var i=0; i<body.length; i++) {
			if (body[i].type === "WhileStatement") {
				return {truth: true, body: body[i]};
			}
		}
		return {truth: false, body: body[i]};	
	},
	varDeclaration: function varCheck(parsedJS) {
		var body = parsedJS.body
		for (var i=0; i<body.length; i++) {
			if (body[i].type === "VariableDeclaration") {
				return {truth: true, body: body[i]};
			}
		}
		return {truth: false, body: body[i]};
	},
	functionDeclaration: function functionCheck(parsedJS) {
		var body = parsedJS.body
		for (var i=0; i<body.length; i++) {
			if (body[i].type === "FunctionDeclaration") {
				return {truth: true, body: body[i]};
			}
		}
		return {truth: false, body: body[i]};
	}
}; 