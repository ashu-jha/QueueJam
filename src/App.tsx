import React, { useState } from 'react';
import { useStore } from './store/useStore';
import { RoomCard } from './components/RoomCard';
import { QueueList } from './components/QueueList';
import { AddSongForm } from './components/AddSongForm';
import { JoinRoom } from './components/JoinRoom';
import { ShareRoom } from './components/ShareRoom';
import { SpotifyPlayer } from './components/SpotifyPlayer';
import { Music2, Plus, Disc3 } from 'lucide-react';

function App() {
  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const [roomName, setRoomName] = useState('');
  const { currentUser, setUser, createRoom, currentRoom } = useStore();

  React.useEffect(() => {
    if (!currentUser) {
      setUser({
        id: Math.random().toString(36).substr(2, 9),
        name: `User ${Math.floor(Math.random() * 1000)}`,
        avatar: `https://source.unsplash.com/100x100/?avatar&${Math.random()}`
      });
    }
  }, [currentUser, setUser]);

  const handleCreateRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomName.trim()) return;
    createRoom(roomName.trim());
    setShowCreateRoom(false);
    setRoomName('');
  };

  return (
    <div className="min-h-screen bg-dark text-white">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1),transparent_50%)]" />
      </div>

      <div className="relative">
        <nav className="glass fixed top-0 left-0 right-0 z-50 px-6 py-4">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Disc3 className="w-8 h-8 text-primary animate-spin-slow" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Harmony Queue
              </h1>
            </div>
            {!currentRoom && (
              <button
                onClick={() => setShowCreateRoom(true)}
                className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-full flex items-center space-x-2 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Create Room</span>
              </button>
            )}
          </div>
        </nav>

        <main className="container mx-auto px-6 pt-24 pb-32">
          {!currentRoom && !showCreateRoom && (
            <div className="space-y-8">
              <JoinRoom />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <RoomCard
                  room={{
                    id: '1',
                    name: 'Example Room',
                    participants: [
                      {
                        id: '1',
                        name: 'John',
                        avatar: 'https://source.unsplash.com/100x100/?avatar&1'
                      }
                    ],
                    queue: [],
                    currentTurn: '1',
                    currentSong: null
                  }}
                />
              </div>
            </div>
          )}

          {showCreateRoom && (
            <div className="glass max-w-md mx-auto rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Create New Room
              </h2>
              <form onSubmit={handleCreateRoom} className="space-y-4">
                <input
                  type="text"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  placeholder="Enter room name..."
                  className="w-full bg-dark-lighter text-white placeholder-white/30 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateRoom(false)}
                    className="flex-1 bg-dark-light hover:bg-dark-lighter text-white px-4 py-3 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-primary hover:bg-primary-dark text-white px-4 py-3 rounded-lg transition-colors"
                  >
                    Create
                  </button>
                </div>
              </form>
            </div>
          )}

          {currentRoom && (
            <div className="space-y-6">
              <div className="glass rounded-2xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      {currentRoom.name}
                    </h2>
                    <p className="text-white/60 mt-1">
                      {currentRoom.participants.length} participants in the room
                    </p>
                  </div>
                  <ShareRoom roomId={currentRoom.id} />
                </div>
                <AddSongForm />
              </div>
              <QueueList
                queue={currentRoom.queue}
                participants={currentRoom.participants}
              />
            </div>
          )}
        </main>
      </div>
      <SpotifyPlayer />
    </div>
  );
}

export default App;