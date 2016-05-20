var acorn = require("acorn");

module.exports.checkStructure = function(text){
	var asdf = acorn.parse(text);
	return asdf;
}
