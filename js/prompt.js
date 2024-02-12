function prompt_blink() {
	if(document.getElementById("prompt").innerHTML != "_") {
		document.getElementById("prompt").innerHTML = "_";
	} else {
		document.getElementById("prompt").innerHTML = " ";	
	}
	setTimeout(prompt_blink, 700);
}

setTimeout(prompt_blink, 700);
