const playlistContainer = document.getElementById("playlist-container");
const backToMainButton = document.getElementById("back-to-main");
const showPlaylistButtons = document.querySelectorAll("[id^='show-playlist']");

// Hide all playlists except the first one
const playlists = playlistContainer.querySelectorAll("iframe");
for (let i = 0; i < playlists.length; i++) {
  playlists[i].style.display = "none";
}

// Show the playlist associated with the pressed button
function showPlaylist() {
  // Get the playlist number from the button ID
  const playlistNumber = parseInt(this.id.slice(-1));
  // Hide all playlists except the selected one
  for (let i = 0; i < playlists.length; i++) {
    if (playlists[i].id === `playlist${playlistNumber}-iframe`) {
      playlists[i].style.display = "block";
    } else {
      playlists[i].style.display = "none";
    }
  }
  // Show the back to main button
  backToMainButton.style.display = "block";
  // Hide all show playlist buttons
  for (let i = 0; i < showPlaylistButtons.length; i++) {
    showPlaylistButtons[i].style.display = "none";
  }
}

// Add event listeners to all show playlist buttons
for (let i = 0; i < showPlaylistButtons.length; i++) {
  showPlaylistButtons[i].addEventListener("click", showPlaylist);
}

// Show all show playlist buttons and hide the back to main button
function backToMain() {
  for (let i = 0; i < showPlaylistButtons.length; i++) {
    showPlaylistButtons[i].style.display = "inline-block";
  }
  for (let i = 0; i < playlists.length; i++) {
    playlists[i].style.display = "none";
  }
  backToMainButton.style.display = "none";
}

// Add event listener to back to main button
backToMainButton.addEventListener("click", backToMain);
