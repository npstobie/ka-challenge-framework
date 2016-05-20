var acorn = require("acorn");

module.exports.checkWhitelist = function(text){
	var asdf = acorn.parse(text);
	return asdf;
}
