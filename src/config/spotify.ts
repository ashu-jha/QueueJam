export const SPOTIFY_CONFIG = {
  clientId: '4f188e596fdb46ccbcbd620eec2b1a23', // Replace with your Spotify Client ID
  clientSecret: 'c819d7da89e64ab2af2fe60450dda058', // Replace with your Spotify Client Secret
  redirectUri: `${window.location.origin}/callback`,
  scopes: [
    'streaming',
    'user-read-email',
    'user-read-private',
    'user-modify-playback-state',
    'user-read-playback-state',
    'playlist-read-private',
    'playlist-read-collaborative'
  ]
};

// Spotify Authentication Flow
export const getSpotifyAuthUrl = () => {
  const params = new URLSearchParams({
    client_id: SPOTIFY_CONFIG.clientId,
    response_type: 'code',
    redirect_uri: SPOTIFY_CONFIG.redirectUri,
    scope: SPOTIFY_CONFIG.scopes.join(' '),
    show_dialog: 'true'
  });

  return `https://accounts.spotify.com/authorize?${params.toString()}`;
};
