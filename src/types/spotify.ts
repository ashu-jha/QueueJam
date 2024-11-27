export interface SpotifyTrack {
  id: string;
  name: string;
  uri: string;
  artists: Array<{
    name: string;
  }>;
  album: {
    name: string;
    images: Array<{
      url: string;
    }>;
  };
}

export interface SpotifyState {
  accessToken: string | null;
  isPlaying: boolean;
  currentTrack: SpotifyTrack | null;
  setAccessToken: (token: string) => void;
  setIsPlaying: (playing: boolean) => void;
  setCurrentTrack: (track: SpotifyTrack | null) => void;
}