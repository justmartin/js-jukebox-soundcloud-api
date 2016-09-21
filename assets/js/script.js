// Your JavaScript Jukebox should:
// Display at least one song on the page when the page loads

// Give the user the ability to play that song, without using the "built-in" play button. This could be through a 
// different button, through clicking or mousing over an image on the page, or any other device of your choosing.

// Give the user the ability to stop that song without using the "built-in" stop button. Once again, this could be 
// through a different button, through clicking or mousing over an image on the page, or any other device of your 
// choosing.

// Give the user the ability to load at least one different song into the Jukebox besides the one that is loaded when 
// the page initially renders

// The whole Jukebox should be backed by an object called Jukebox with methods to play, stop, and load songs.

$(document).ready(function() {

	//defines new Jukebox variable
    jukebox = new Jukebox();

   	//defines new songs and adds them to songs array via Jukebox functions
	var song1 = new Song("assets/audio/Hall-&-Oates-Sara-Smile.mp3");
	var song2 = new Song("assets/audio/The-Commodores-Easy.mp3")
	jukebox.addSong(song1);
	jukebox.addSong(song2);

	//call Jukebox functions based on corresponding button click using jQuery
	$("#play-button").click(function() {
		jukebox.playSong();
	});

	$("#stop-button").click(function() {
		jukebox.stopSong();
	});

	$("#next-button").click(function() {
		jukebox.nextSong();
	});

	$("#back-button").click(function() {
		jukebox.previousSong();
	});

	$("#volume-down").click(function() {
		jukebox.turnVolumeDown();
	});

	$("#volume-up").click(function() {
		jukebox.turnVolumeUp();
	});

});

//creates a Song object that takes a source. will be used to populate songs array.
function Song(source) {
	this.source = source;
};

//defines Jukebox object
function Jukebox() {
	i = 0; //defines interator
	this.songs = []; //defines array to store song sources

	this.addSong = function(song) {
		this.songs.push(song); //adds sources to songs array
		$("#audio-player").attr("src", this.songs[0].source); //assigns first song in array to audio source on load 
	};

	this.playSong = function() {
		$("#audio-player")[0].play(); //plays current indexed song
	};

	this.stopSong = function() {
		$("#audio-player")[0].pause(); //stops current indexed song
	};

	this.nextSong = function(songs) {
		var arrayLength = this.songs.length; //defines array length
		for (var i = 0; i < arrayLength; i++) { //handling ability to only loop till end of array
		    $("#audio-player")[0].src = this.songs[i].source; //assigns source of audio tag based on array index
			this.playSong(); //plays current indexed song
		}
	};

	this.previousSong = function() {
		var arrayLength = this.songs.length; //defines array length
		for (var i = 0; i < arrayLength; i--) { //handling ability to only loop till beginning of array
		    $("#audio-player")[0].src = this.songs[i].source; //assigns source of audio tag based on array index
			this.playSong(); //plays current indexed song
		}
	};

	this.turnVolumeDown = function() {
		$("#audio-player")[0].volume-=0.1; //decreases volume
	};

	this.turnVolumeUp = function() {
		$("#audio-player")[0].volume+=0.1; //increases volume
	};
};
