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
	  client_id: "9a1358c581fbce53ea61cd78cd57768f"
	});

	$("#search-sc-button").click(function() {
		artist = $("#artist-input").val();
		SC.get('/tracks', {q: artist}).then(function(tracks) {
			i = 0;
			tracklist = tracks;
			console.log(tracklist);
		});
	});

	$("#play-button").click(function() {
		SC.stream('/tracks/' + tracklist[i].id).then(function(player){
	  		player.play();
	  		assign_information(i);
		});
	});

	$("#stop-button").click(function() {
		SC.stream('/tracks/' + tracklist[i].id).then(function(player){
	  		player.pause();
		});
	});

	$("#next-button").click(function() {
		var arrayLength = tracklist.length; //defines array length
		for (var i = 0; i < arrayLength; i++) { //handling ability to only loop till end of array
		    	SC.stream('/tracks/' + tracklist[i].id).then(function(player){
	  			player.play();
	  			assign_information(i);
			});
		};
	});

	$("#back-button").click(function() {
		var arrayLength = tracklist.length; //defines array length
		for (var i = 0; i < arrayLength; i--) { //handling ability to only loop till end of array
		    	SC.stream('/tracks/' + tracklist[i].id).then(function(player){
	  			player.play();
			});
		};
	});

});

assign_information = function(i) {
	$("#artist").append(artist);
  	$("#profile").append(tracklist[i].permalink_url);
  	$("#title").append(tracklist[i].title);
  	$("#description").append(tracklist[i].description);
  	$("#genre").append(tracklist[i].genre);
  	$("#release").append(tracklist[i].release_year);
  	$("#album-artwork").attr("src", tracklist[i].artwork_url);
}



