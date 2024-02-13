function swapcss() {
	document.getElementById("lightmode").blur();
	var css = document.getElementById("mainsheet");
	var href = css.getAttribute("href")
	
	if(href != "./css/style.css") {
		css.setAttribute("href","./css/style.css");
	} else {
		css.setAttribute("href", "./css/alt.css");
	}
}

document.getElementById("lightmode").onclick = swapcss;
