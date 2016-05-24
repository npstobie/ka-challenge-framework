var acorn = require("acorn");
var tests = require("./tests.js")

// whiteList check
module.exports.whiteListTest = function(obj){
	var whiteList = {};
	var parsedJS = acorn.parse(obj.text);
	for (var type in obj.checks) {
		if (obj.checks[type] === "true") {
			var result = tests[type](parsedJS);
			console.log(result);
			whiteList[type] = result.truth;
		}
	}
	return whiteList;
}