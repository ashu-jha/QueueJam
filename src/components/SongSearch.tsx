import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { SpotifyApi } from '@spotify/web-api-ts-sdk';
import { SpotifyTrack } from '../types/spotify';

interface SongSearchProps {
  onSelect: (track: SpotifyTrack) => void;
}

export const SongSearch: React.FC<SongSearchProps> = ({ onSelect }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SpotifyTrack[]>([]);
  const [loading, setLoading] = useState(false);

  const searchTracks = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const spotify = SpotifyApi.withClientCredentials(
        'YOUR_CLIENT_ID',
        'YOUR_CLIENT_SECRET'
      );

      const response = await spotify.search.items(searchQuery, ['track']);
      setResults(response.tracks.items);
    } catch (error) {
      console.error('Failed to search tracks:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            searchTracks(e.target.value);
          }}
          placeholder="Search for a song..."
          className="w-full bg-white/10 text-white placeholder-white/50 rounded-lg px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
      </div>

      {results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900 rounded-lg shadow-xl max-h-64 overflow-y-auto">
          {results.map((track) => (
            <button
              key={track.id}
              onClick={() => {
                onSelect(track);
                setQuery('');
                setResults([]);
              }}
              className="w-full p-3 hover:bg-white/5 flex items-center space-x-3 text-left"
            >
              <img
                src={track.album.images[0]?.url}
                alt={track.album.name}
                className="w-10 h-10 rounded"
              />
              <div>
                <p className="text-white font-medium">{track.name}</p>
                <p className="text-white/60 text-sm">
                  {track.artists.map(a => a.name).join(', ')}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}

      {loading && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900 rounded-lg p-4 text-center text-white/60">
          Searching...
        </div>
      )}
    </div>
  );
};