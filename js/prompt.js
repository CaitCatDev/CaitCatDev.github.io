function prompt_blink() {
	if(document.getElementById("prompt").innerHTML != "_") {
		document.getElementById("prompt").innerHTML = "_";
	} else {
		document.getElementById("prompt").innerHTML = " ";	
	}
	setTimeout(prompt_blink, 700);
}

setTimeout(prompt_blink, 700);

document.addEventListener('keydown', function(event) {
	var input = document.getElementById("input");
	if(event.key === 'Enter') {
		if(input.innerHTML == "sudo") {
			document.getElementById("result").innerHTML = "user is is not in the sudoers file. This incident has been reported to the administrator.";
		} else if (input.innerHTML == "ls") {
			document.getElementById("result").innerHTML = "Probably files or something";
		} else if (input.innerHTML == "hello") {
			document.getElementById("result").innerHTML = "Hello to you to";
		} else if (input.innerHTML == "about") {
			document.getElementById("result").innerHTML = "About who?";
		} else {
			document.getElementById("result").innerHTML = input.innerHTML + ": Command not found";
		}
		input.innerHTML = "";
	} else if(event.key === 'Backspace') {
		input.innerHTML = input.innerHTML.substring(0, input.innerHTML.length - 1);
	} else if(event.key.length == 1){
		input.innerHTML += event.key;
	}
});
