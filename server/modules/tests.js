module.exports = {
	forLoop: function (parsedJS) {
		var body = parsedJS.body
		for (var i=0; i<body.length; i++) {
			if (body[i].type === "ForStatement") {
				return {truth: true, body: body[i]};
			}
		}
		return {truth: false, body: null};
	},
	ifStatement: function ifCheck(parsedJS){
		var body = parsedJS.body
		for (var i=0; i<body.length; i++) {
			if (body[i].type === "IfStatement") {
				return {truth: true, body: body[i]};
			}
		}
		return {truth: false, body: null};
	},
	whileLoop: function whileLoopCheck(parsedJS) {
		var body;
		Array.isArray(parsedJS) === true ? body = parsedJS : body = parsedJS.body;
		for (var i=0; i<body.length; i++) {
			if (body[i].type === "WhileStatement") {
				return {truth: true, body: body[i]};
			}
		}
		return {truth: false, body: null};	
	},
	varDeclaration: function varCheck(parsedJS) {
		var body = parsedJS.body
		for (var i=0; i<body.length; i++) {
			if (body[i].type === "VariableDeclaration") {
				return {truth: true, body: body[i]};
			}
		}
		return {truth: false, body: null};
	},
	functionDeclaration: function functionCheck(parsedJS) {
		var body = parsedJS.body
		for (var i=0; i<body.length; i++) {
			if (body[i].type === "FunctionDeclaration") {
				return {truth: true, body: body[i]};
			}
		}
		return {truth: false, body: null};
	}
}