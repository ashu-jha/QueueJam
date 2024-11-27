import React, { useState } from 'react';
import { useStore } from '../store/useStore';

export const JoinRoom: React.FC = () => {
  const [roomCode, setRoomCode] = useState('');
  const { joinRoomById } = useStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomCode.trim()) return;
    
    try {
      await joinRoomById(roomCode.trim());
      setRoomCode('');
    } catch (error) {
      console.error('Failed to join room:', error);
      // You could add error handling UI here
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
      <h2 className="text-xl font-bold text-white mb-4">Join a Room</h2>
      <div className="flex space-x-4">
        <input
          type="text"
          value={roomCode}
          onChange={(e) => setRoomCode(e.target.value)}
          placeholder="Enter room code..."
          className="flex-1 bg-white/5 text-white placeholder-white/50 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          type="submit"
          className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg"
        >
          Join
        </button>
      </div>
    </form>
  );
};