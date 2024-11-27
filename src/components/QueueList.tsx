import React from 'react';
import { Music } from 'lucide-react';
import { Song, User } from '../types/room';

interface QueueListProps {
  queue: Song[];
  participants: User[];
}

export const QueueList: React.FC<QueueListProps> = ({ queue, participants }) => {
  const getSuggester = (suggesterId: string) => 
    participants.find(p => p.id === suggesterId);

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
      <h3 className="text-white text-xl font-bold mb-4">Queue</h3>
      
      <div className="space-y-4">
        {queue.map((song, index) => {
          const suggester = getSuggester(song.suggestedBy);
          const spotifyTrack = song.spotifyTrack;
          
          return (
            <div 
              key={song.id}
              className="flex items-center space-x-4 bg-white/5 p-4 rounded-lg"
            >
              {spotifyTrack ? (
                <img 
                  src={spotifyTrack.album.images[0]?.url}
                  alt={spotifyTrack.album.name}
                  className="w-12 h-12 rounded-lg"
                />
              ) : (
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                  <Music className="w-6 h-6 text-white" />
                </div>
              )}
              
              <div className="flex-1">
                <h4 className="text-white font-medium">{song.title}</h4>
                {spotifyTrack && (
                  <p className="text-white/60 text-sm">
                    {spotifyTrack.artists.map(a => a.name).join(', ')}
                  </p>
                )}
                <p className="text-white/40 text-sm">
                  Suggested by {suggester?.name}
                </p>
              </div>
              
              <div className="text-white/40 text-sm">
                #{index + 1}
              </div>
            </div>
          );
        })}
        
        {queue.length === 0 && (
          <div className="text-white/60 text-center py-8">
            No songs in queue yet
          </div>
        )}
      </div>
    </div>
  );
};