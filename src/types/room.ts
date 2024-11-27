import { SpotifyTrack } from './spotify';

export interface Song {
  id: string;
  title: string;
  suggestedBy: string;
  timestamp: number;
  spotifyTrack?: SpotifyTrack;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
}

export interface Room {
  id: string;
  name: string;
  participants: User[];
  queue: Song[];
  currentTurn: string;
  currentSong: Song | null;
}