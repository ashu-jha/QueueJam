import { create } from 'zustand';
import { Room, User, Song } from '../types/room';
import { SpotifyTrack } from '../types/spotify';
import { nanoid } from 'nanoid';

interface Store {
  currentUser: User | null;
  currentRoom: Room | null;
  rooms: Record<string, Room>;
  setUser: (user: User) => void;
  createRoom: (name: string) => Room;
  joinRoom: (room: Room) => void;
  joinRoomById: (roomId: string) => Promise<void>;
  addSong: (title: string, spotifyTrack?: SpotifyTrack) => void;
  skipTurn: () => void;
}

export const useStore = create<Store>((set, get) => ({
  currentUser: null,
  currentRoom: null,
  rooms: {},
  
  setUser: (user) => set({ currentUser: user }),
  
  createRoom: (name) => {
    const user = get().currentUser;
    if (!user) throw new Error('No user set');
    
    const room: Room = {
      id: nanoid(),
      name,
      participants: [user],
      queue: [],
      currentTurn: user.id,
      currentSong: null,
    };
    
    set(state => ({
      currentRoom: room,
      rooms: { ...state.rooms, [room.id]: room }
    }));
    return room;
  },
  
  joinRoom: (room) => {
    const user = get().currentUser;
    if (!user) throw new Error('No user set');
    
    const updatedRoom = {
      ...room,
      participants: [...room.participants, user],
    };
    
    set(state => ({
      currentRoom: updatedRoom,
      rooms: { ...state.rooms, [room.id]: updatedRoom }
    }));
  },

  joinRoomById: async (roomId) => {
    const { rooms, currentUser } = get();
    if (!currentUser) throw new Error('No user set');
    
    const room = rooms[roomId];
    if (!room) throw new Error('Room not found');
    
    const updatedRoom = {
      ...room,
      participants: [...room.participants, currentUser],
    };
    
    set(state => ({
      currentRoom: updatedRoom,
      rooms: { ...state.rooms, [roomId]: updatedRoom }
    }));
  },
  
  addSong: (title, spotifyTrack) => {
    const { currentUser, currentRoom } = get();
    if (!currentUser || !currentRoom) return;
    
    if (currentRoom.currentTurn !== currentUser.id) return;
    
    const newSong: Song = {
      id: nanoid(),
      title,
      suggestedBy: currentUser.id,
      timestamp: Date.now(),
      spotifyTrack,
    };
    
    const nextParticipantIndex = 
      (currentRoom.participants.findIndex(p => p.id === currentUser.id) + 1) % 
      currentRoom.participants.length;
    
    const updatedRoom = {
      ...currentRoom,
      queue: [...currentRoom.queue, newSong],
      currentTurn: currentRoom.participants[nextParticipantIndex].id,
      currentSong: currentRoom.currentSong || newSong,
    };
    
    set(state => ({
      currentRoom: updatedRoom,
      rooms: { ...state.rooms, [currentRoom.id]: updatedRoom }
    }));
  },
  
  skipTurn: () => {
    const { currentUser, currentRoom } = get();
    if (!currentUser || !currentRoom) return;
    
    if (currentRoom.currentTurn !== currentUser.id) return;
    
    const nextParticipantIndex = 
      (currentRoom.participants.findIndex(p => p.id === currentUser.id) + 1) % 
      currentRoom.participants.length;
    
    const updatedRoom = {
      ...currentRoom,
      currentTurn: currentRoom.participants[nextParticipantIndex].id,
    };
    
    set(state => ({
      currentRoom: updatedRoom,
      rooms: { ...state.rooms, [currentRoom.id]: updatedRoom }
    }));
  },
}));