window.onload = function() {
	document.getElementById("cap_place").onclick = displayCaption;
	document.getElementById("emoji_place").onclick = displayEmoji;
	document.getElementById("hashtag_place").onclick = displayHashtags;
	document.getElementById("submit").onclick = makeRequest;
};

function makeRequest() {
	var mood = document.querySelector('input[name="mood"]:checked').value;
	var url = document.getElementById("exampleInputName2").innerHTML;
	var request = new XMLHttpRequest();
	request.onload = processData;
	request.open("POST", , true);
	request.send();
}

function processData() {
	var results = JSON.parse(this);
	var hashDiv = document.getElementById("hashtag");
	hashDiv.innerHTML = results.hashtags;
	var capDiv = document.getElementById("caption");
	hashDiv.innerHTML = results.captions;
	var emojDiv = document.getElementById("emoji");
	emojDiv.innerHTML = results.emojis;
	document.get("results").style.display = "block";
	link(results.hashtags);
	link(results.captions);
	link(results.emojis);
}

function displayCaption() {
	document.getElementById("hashtag").style.display = "none";
	document.getElementById("emoji").style.display = "none";
	document.getElementById("caption").style.display = "block";
}

function displayEmoji() {
	document.getElementById("hashtag").style.display = "none";
	document.getElementById("caption").style.display = "none";
	document.getElementById("emoji").style.display = "block";	
}

function displayHashtag() {
	document.getElementById("caption").style.display = "none";
	document.getElementById("emoji").style.display = "none";
	document.getElementById("hashtag").style.display = "block";
}

function addToCaption() {
	var currCaption = document.getElementById("caption-builder").innerHTML;
	currCaption = currCaption + " " + this;
}

function link(data) {
	for (int i = 0; i < data.length; i++) {
		data[i].onclick = addToCaption;
	}
}