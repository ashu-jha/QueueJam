import React from 'react';
import { Music, Users } from 'lucide-react';
import { Room } from '../types/room';

interface RoomCardProps {
  room: Room;
  onClick?: () => void;
}

export const RoomCard: React.FC<RoomCardProps> = ({ room, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="bg-gradient-to-br from-purple-600 to-blue-500 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-1"
    >
      <h3 className="text-white text-xl font-bold mb-4">{room.name}</h3>
      
      <div className="flex items-center text-white/80 mb-3">
        <Users className="w-4 h-4 mr-2" />
        <span>{room.participants.length} participants</span>
      </div>
      
      {room.currentSong && (
        <div className="flex items-center text-white/80">
          <Music className="w-4 h-4 mr-2" />
          <span className="truncate">{room.currentSong.title}</span>
        </div>
      )}
      
      <div className="mt-4 flex -space-x-2">
        {room.participants.slice(0, 5).map((user) => (
          <img
            key={user.id}
            src={user.avatar}
            alt={user.name}
            className="w-8 h-8 rounded-full border-2 border-white"
          />
        ))}
        {room.participants.length > 5 && (
          <div className="w-8 h-8 rounded-full border-2 border-white bg-white/20 flex items-center justify-center text-white text-sm">
            +{room.participants.length - 5}
          </div>
        )}
      </div>
    </div>
  );
};