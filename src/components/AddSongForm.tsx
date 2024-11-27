import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { useStore } from '../store/useStore';
import { SongSearch } from './SongSearch';
import { SpotifyTrack } from '../types/spotify';

export const AddSongForm: React.FC = () => {
  const { currentRoom, currentUser, addSong } = useStore();
  const isMyTurn = currentRoom?.currentTurn === currentUser?.id;

  const handleSongSelect = (track: SpotifyTrack) => {
    if (!isMyTurn) return;
    
    addSong(track.name, track);
  };

  return (
    <div className="mt-6 space-y-4">
      {isMyTurn ? (
        <div className="relative">
          <SongSearch onSelect={handleSongSelect} />
        </div>
      ) : (
        <div className="bg-white/10 text-white/60 rounded-lg px-4 py-3 text-center">
          Wait for your turn to suggest a song
        </div>
      )}
    </div>
  );
};