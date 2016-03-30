function $(s) {
	return document.querySelectorAll(s);
}

var lis = $("#list li");

for (var i = 0; i < lis.length; i++) {
	lis[i].onclick = function() {
		for (var j = 0; j < lis.length; j++) {
			lis[j].className = '';
		}
		this.classNameame = "selected";
		load("media/Dawn.mp3");
	}
}


var xhr = new XMLHttpRequest();
var ac = new(window.AudioContext || window.webkitAudioContext)();

function load(url) {
	xhr.open("GET", url);
	xhr.responseType = "arraybuffer";
	xhr.onload = function() {
		ac.decodeAudioData(xhr.response, function(buffer) {
			var bufferSource = ac.createBufferSource();
			bufferSource.buffer = buffer;
			bufferSource.connect(ac.destination);
			bufferSource[bufferSource.start ? "start" : "noteOn"](0);
		}, function(err) {
			console.log(err);
		})
	}
	xhr.send();
}