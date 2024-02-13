function prompt_blink() {
	if(document.getElementById("prompt").innerHTML != "_") {
		document.getElementById("prompt").innerHTML = "_";
	} else {
		document.getElementById("prompt").innerHTML = " ";	
	}
	setTimeout(prompt_blink, 700);
}

setTimeout(prompt_blink, 700);

function keydown_event(event) {
	var input = document.getElementById("input");
	const id_strs = [ "sudo", "help", "about", "projects" ];

	if(event.key === 'Enter') {
		if(input.innerHTML == "") {
			document.getElementById("about").setAttribute("style", "display: block");
			document.getElementById("projects").setAttribute("style", "display: block");
			/*Hide Sudo and help as they don't "fit" when user opts to skip the terminal
			 * game and don't make sense to be displayed
			 */
			document.getElementById("sudo").setAttribute("style", "display: none");
			document.getElementById("help").setAttribute("style", "display: none");
			document.getElementById("result").setAttribute("style", "display: none");
			return
		}
		document.getElementById("result").setAttribute("style", "display: block");

		for(let i=0; i < id_strs.length; i++) {
			document.getElementById(id_strs[i]).setAttribute("style", "display: none");
			if(input.innerHTML == id_strs[i]) {
				document.getElementById("result").setAttribute("style", "display: none");
				document.getElementById(id_strs[i]).setAttribute("style", "display: block");
			}
		}
		
		document.getElementById("result").innerHTML = input.innerHTML + ": Command not found";
		input.innerHTML = "";
	} else if(event.key === 'Backspace') {
		input.innerHTML = input.innerHTML.substring(0, input.innerHTML.length - 1);
	} else if(event.key.length == 1){
		input.innerHTML += event.key;
	}
}

document.addEventListener('keydown', keydown_event);
