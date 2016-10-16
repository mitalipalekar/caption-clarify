window.onload = function() {
	// document.getElementById("cap_place").onclick = displayCaption;
	// document.getElementById("emoji_place").onclick = displayEmoji;
	// document.getElementById("hashtag_place").onclick = displayHashtag;
	document.getElementById("goButton").onclick = makeRequest;
};

function makeRequest() {
	return new Promise(function(resolve, reject) {
		var mood = document.querySelector('input[name="mood"]:checked').value;
		var imageURL = document.getElementById("texthere").value;
		var url = 'http://localhost:3102/captioner/caption?mood=' + mood + '&imageURL=' + imageURL;
		var request = new XMLHttpRequest();
		request.onload = processData;
		request.open('GET', url, true);

		// request.onload = function() {
		//   if (request.status >= 200 && request.status < 400) {
		//     // Success!
		//     var data = JSON.parse(request.responseText);
		//     resolve(data);
		//   } else {
		//     // We reached our target server, but it returned an error
		//     reject(request.responseText);
		//   }
		// };

		request.onerror = function() {
		  // There was a connection error of some sort
		};
		request.send();

	});
}

function processData() {
	console.log(this);
	var results = JSON.parse(this.response);
	alert('here');
	var hashDiv = document.getElementById("hashtag");
	console.log(results);
	hashDiv.innerHTML = results.hashtags;
	var capDiv = document.getElementById("caption");
	hashDiv.innerHTML = results.captions;
	var emojDiv = document.getElementById("emoji");
	emojDiv.innerHTML = results.emojis;
	document.getElementById("results").style.display = "block";
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
	for (var i = 0; i < data.length; i++) {
		data[i].onclick = addToCaption;
	}
}

// function getUrl(url) {
// 	return new Promise(function(resolve, reject) {
// 		var request = new XMLHttpRequest();
// 		request.open('GET', url, true);

// 		request.onload = function() {
// 		  if (request.status >= 200 && request.status < 400) {
// 		    // Success!
// 		    var data = JSON.parse(request.responseText);
// 		    resolve(data);
// 		  } else {
// 		    // We reached our target server, but it returned an error
// 		    reject(request.responseText);
// 		  }
// 		};

// 		request.onerror = function() {
// 		  // There was a connection error of some sort
// 		};

// 		request.send();

// 	});
// }