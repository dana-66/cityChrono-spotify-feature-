// Spotify API credentials
const clientId = '040999076b8f4825bd53cd6db0951796';
const redirectUri = 'http://localhost:3000/callback';
const scopes = ['user-read-private', 'user-read-email'];

// DOM elements
const spotifyBtn = document.getElementById('login-button');

// Check if the user is logged in to Spotify
function checkIfLoggedIn() {
  const params = new URLSearchParams(window.location.hash.substr(1));
  const token = params.get('access_token');
  if (token !== null && token !== undefined) {
    // User is already logged in
    return token;
  } else {
    // User is not logged in
    return false;
  }
}

// Authorize the app with Spotify
function authorizeSpotifyApp() {
  // Check if the user is logged in
  const token = checkIfLoggedIn();
  if (!token) {
    // If not logged in, open the login window
    const url = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes.join(' '))}`;
    window.open(url, '_blank', 'width=400,height=600');
  } else {
    // If already logged in, authorize the app
    console.log('Authorizing the app');
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
      },
      body: 'grant_type=refresh_token&refresh_token=' + token
    };
    fetch('https://accounts.spotify.com/api/token', options)
      .then(response => response.json())
      .then(data => {
        console.log(data.access_token);
        // Use the access token to make requests to the Spotify Web API
      });
  }
}
function getUserProfile(token) {
    return fetch('https://api.spotify.com/v1/me', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log('User profile:', data);
    })
    .catch(error => {
      console.error('Error fetching user profile:', error);
    });
  }
  
// Event listeners
spotifyBtn.addEventListener('click', authorizeSpotifyApp);
