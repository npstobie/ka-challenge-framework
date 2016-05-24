var acorn = require("acorn"),
		tests = require("./tests.js"),
		structureTest = require('./structureTest.js'),
		whiteListTest = require('./whiteListTest.js'),
		blackListTest = require('./blackListTest.js');

// runs a check on whiteList, blackList, and structure
module.exports.testText = function(obj){
	var results = {
		whiteList:{},
		blackList:{},
		structure: {}
	}
	var parsedJS = acorn.parse(obj.text);
	for (var key in obj.checks) {
		if (key === "whiteList") {
			results.whiteList = whiteListTest.whiteListTest({checks: obj.checks[key], text: obj.text});
		} else if (key === "blackList") {
			results.blackList = blackListTest.blackListTest({checks: obj.checks[key], text: obj.text});
		} 
		else if (key === "structure") {
			results.structure = structureTest.structureTest(obj.checks[key], obj);
		}
	}
	return results;
}