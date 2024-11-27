import React, { useEffect, useState } from 'react';
import { Play, Pause, SkipForward, Volume2 } from 'lucide-react';
import { useSpotifyStore } from '../store/useSpotifyStore';
import { useStore } from '../store/useStore';

export const SpotifyPlayer: React.FC = () => {
  const { currentTrack, isPlaying, setIsPlaying } = useSpotifyStore();
  const [player, setPlayer] = useState<Spotify.Player | null>(null);
  const { currentRoom } = useStore();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;
    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const spotifyPlayer = new window.Spotify.Player({
        name: 'Music Queue Web Player',
        getOAuthToken: cb => {
          // Get token from your backend/auth solution
          cb('YOUR_TOKEN_HERE');
        },
      });

      spotifyPlayer.connect();
      setPlayer(spotifyPlayer);
    };

    return () => {
      script.remove();
      player?.disconnect();
    };
  }, []);

  const togglePlay = () => {
    if (player) {
      if (isPlaying) {
        player.pause();
      } else {
        player.resume();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const skipTrack = () => {
    if (player && currentRoom?.queue.length) {
      player.nextTrack();
    }
  };

  if (!currentTrack) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-lg text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img
            src={currentTrack.album.images[0]?.url}
            alt={currentTrack.album.name}
            className="w-12 h-12 rounded"
          />
          <div>
            <h4 className="font-medium">{currentTrack.name}</h4>
            <p className="text-sm text-white/60">
              {currentTrack.artists.map(a => a.name).join(', ')}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={togglePlay}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5" />
            ) : (
              <Play className="w-5 h-5" />
            )}
          </button>
          <button
            onClick={skipTrack}
            disabled={!currentRoom?.queue.length}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center disabled:opacity-50"
          >
            <SkipForward className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-2">
            <Volume2 className="w-5 h-5" />
            <input
              type="range"
              min="0"
              max="100"
              className="w-24"
              onChange={(e) => {
                player?.setVolume(parseInt(e.target.value) / 100);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};