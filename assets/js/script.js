// Your SoundCloud enabled jukebox should allow the user to do the following things:

// Play a track off of SoundCloud based on its track ID
// Pause the currently playing track
// Display the following current track information:
// Artist name with link to his/her profile page
// Title with link to track's page
// Description, genre and release date
// Artwork

// Playlist Challenge:
// If you have time and are looking for an extra challenge try the following. Create a playlist on 
// SoundCloud and enable the user to do the following things:

// Play a track off of a chosen playlist
// Pause the currently playing track
// Skip to the next or previous track
// Jump to the beginning when skipping forward from the last track
// Jump to the end when skipping backward the first track
// Display the following playlist information:
// Creator with link to his/her profile page
// Playlist title with link to playlist page
// Artwork

$(document).ready(function() {
	SC.initialize({ 
	  client_id: "9a1358c581fbce53ea61cd78cd57768f" //enters personal account id from SC
	});
});

//takes the user input and searches SC for relevant artist, puts it into an array, and lists the titles
$("#search-sc-button").click(function() {
	$("#song-titles").empty();
	artist = $("#artist-input").val();
	SC.get('/tracks', {q: artist}).then(function(tracks) {
		i = 0;
		tracklist = tracks;
		tracklist.map(function(tracklist) {
			$("#song-titles").append(tracklist.title + "<br>");
		})
	});
});

//plays the songs in the array in incremental order
$("#play-button").click(function() {
	SC.stream('/tracks/' + tracklist[i].id).then(function(player){
  		player.play();
  		assign_information(i);

  		$("#stop-button").click(function() {
  			player.pause();
		});
	});
});

//skips to next song in array by index and assigns info
$("#next-button").click(function() {
	i = i + 1;
	SC.stream('/tracks/' + tracklist[i].id).then(function(player){
		player.play();
		assign_information(i);
	});
});

//skips to previous song is array by index and assigns info
$("#back-button").click(function() {
	i = i - 1;
	SC.stream('/tracks/' + tracklist[i].id).then(function(player){
		player.play();
		assign_information(i);
	});
});

//function that erases current artist info and replaces it with new
assign_information = function(i) {
	$("#artist").empty();
  	$("#profile").empty();
  	$("#title").empty();
  	$("#description").empty();
  	$("#genre").empty();
  	$("#release").empty();

	$("#artist").append(artist);
  	$("#profile").append(tracklist[i].permalink_url);
  	$("#title").append(tracklist[i].title);
  	$("#description").append(tracklist[i].description);
  	$("#genre").append(tracklist[i].genre);
  	$("#release").append(tracklist[i].release_year);
  	$("#album-artwork").attr("src", tracklist[i].artwork_url);
};