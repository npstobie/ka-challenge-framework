var acorn = require("acorn");
var tests = require("./tests.js")

// structure check
module.exports.structureTest = function(struct, data) {
	var structure = {};
	var parsedJS = acorn.parse(data.text);
	function structureLayerCheck(obj, js, res){
		for (var key in obj) {
			if (typeof obj[key] === "object"){
				var result = tests[key](js);
				if (result.truth === true) {
					var body;
					// structure of if statement data from acorn differs from the other types
					// so it requires special treatment
					result.body.type === "IfStatement" ? body = result.body.consequent : body = result.body.body
					res[key] = structureLayerCheck(obj[key], body, {});
				}
			} else {
				var result = tests[key](js);
				res[key] = result.truth;
			}
		}
		structure = res;
		return res;
	}
	structureLayerCheck(struct, parsedJS, structure);
	return structure;
}