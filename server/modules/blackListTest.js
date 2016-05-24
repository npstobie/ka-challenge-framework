var acorn = require("acorn");
var tests = require("./tests.js")

// blackList check
module.exports.blackListTest = function(obj){
	var blackList = {};
	var parsedJS = acorn.parse(obj.text);
	for (var type in obj.checks) {
		console.log(obj.checks[type] === "true", "YES");
		if (obj.checks[type] === "true") {
			console.log("HER")
			var result = tests[type](parsedJS);
			blackList[type] = !result.truth;
		}
	}
	return blackList;
}