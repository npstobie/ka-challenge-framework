var acorn = require("acorn");

module.exports.checkBlacklist = function(text){
	var asdf = acorn.parse(text);
	return asdf;
}
