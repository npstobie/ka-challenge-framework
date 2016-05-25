// format that the objects sent to the API should follow if using the 'checkJS'
// endpoint, the object should include all 3 key/value pairs as seen below
var checks = {
	// if using one of the specific endpoints like whiteList, only an object 
	// reflecting the format of checks.whiteList should be sent with the request
	whiteList: {
		forLoop: false,
		varDeclaration: false,
		ifStatement: false,
		whileLoop: false,
		functionDeclaration: false
	},
	blackList: {
		forLoop: false,
		varDeclaration: false,
		ifStatement: false,
		whileLoop: false,
		functionDeclaration: false
	},
	structure: {
		functionDeclaration: {
			ifStatement: {
				whileLoop: true
			}
		},
		forLoop: {
			varDeclaration: true
		}
	}
};

// updates the checks object each time a checkbox is selected
$(".checks").change(function(){
	var current = checks[$(this).parent().parent()[0].id][$(this)[0].value];
	checks[$(this).parent().parent()[0].id][$(this)[0].value] = !current;
	if ($(this)[0].checked === true){
		var divClass = "." + $(this).parent().parent()[0].id;
		$(divClass).append("<div class='task " + $(this)[0].value + " " + $(this).parent().parent()[0].id + "1'>" + $(this).parent()[0].innerText + "<div>");
	} else {
		var divClass = "." + $(this).parent().parent()[0].id + "1." + $(this)[0].value;
		$(divClass).remove();
	}
	jsCheck();
})

// makes a call to the server each time a user presses the enter key or the semicolon key
$("#editor").on('keydown', function(key){
	if (key.which === 13 || key.which === 186) {
		setTimeout(jsCheck, 1);
	}
})

var timer = createTimeout();

// calls timer anytime the user doesn't type for 2.5 seconds
$("#editor").on('keydown', function(){
	timer();
})

// used a function to create the timeout so the timeout variable is private
// and not assigned in the global scope
function createTimeout() {
	var timeout;
	return (
		function(){
			clearTimeout(timeout);
			timeout = setTimeout(function(){
				jsCheck();
			},2500)
		}
	)
}

// function that makes the call from the client to the server, checks whiteList, blackList,
// and structure, and updates the colors of checks on the client to green if the check passed
function jsCheck(){
	var text = editor.getValue();
	$.post("/checkJS", {text: text, checks: checks})
		.done(function(data){
			console.log(data);
			for (var key in data) {
				if (key === "structure") {
					checkStructure(data[key]);
				}
				for (var type in data[key]) {
					if (data[key][type] === true) {
						var classes = "." + key + "1." + type;
						$(classes).css({'color': '#2ecc71'});
					} else if (data[key]){
						var classes = "." + key + "1." + type;
						$(classes).css({'color': 'red'});
					}
				}
			}
		})
}

// function that updates the checks on the structure code
// (this code is not verbose, would definitely update if I had more time)
function checkStructure(obj){
	for (var key in obj) {
		var elClass = "." + key;
		if (typeof obj[key] === "object") {
			$("#structure").find(elClass).css({"color":"#2ecc71"})
			checkStructure(obj[key]);
		} else if (obj[key] === true) {
			$("#structure").find(elClass).css({"color":"#2ecc71"})
		} else if (obj[key] === false) {
			$("#structure").find(elClass).css({"color":"red"})
		}
	}
}