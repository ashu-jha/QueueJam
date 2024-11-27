import { create } from 'zustand';
import { SpotifyState, SpotifyTrack } from '../types/spotify';

export const useSpotifyStore = create<SpotifyState>((set) => ({
  accessToken: null,
  isPlaying: false,
  currentTrack: null,
  setAccessToken: (token) => set({ accessToken: token }),
  setIsPlaying: (playing) => set({ isPlaying: playing }),
  setCurrentTrack: (track) => set({ currentTrack: track }),
}));