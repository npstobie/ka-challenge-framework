var checks = {
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

//updates the checks object each time a checkbox is selected
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

$("#editor").on('keypress', function(){
	setTimeout(jsCheck, 1);
})

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
						console.log(key, type)
						var classes = "." + key + "1." + type;
						$(classes).css({'color': '#2ecc71'});
					} else {
						var classes = "." + key + "1." + type;
						$(classes).css({'color': 'red'});
					}
				}
			}
		})
}

function checkStructure(obj){
	for (var key in obj) {
		var elClass = "." + key;
		if (typeof obj[key] === "object") {
			$("#structure").find(elClass).css({"color":"green"})
			checkStructure(obj[key]);
		} else if (obj[key] === true) {
			$("#structure").find(elClass).css({"color":"green"})
		}
	}
}