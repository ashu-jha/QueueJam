import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSpotifyStore } from '../store/useSpotifyStore';

export const SpotifyCallback: React.FC = () => {
  const navigate = useNavigate();
  const { setAccessToken } = useSpotifyStore();

  useEffect(() => {
    const handleCallback = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');

      if (code) {
        try {
          // Exchange code for access token
          const response = await fetch('/api/spotify/token', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code }),
          });

          const data = await response.json();
          if (data.access_token) {
            setAccessToken(data.access_token);
            navigate('/');
          }
        } catch (error) {
          console.error('Failed to exchange code for token:', error);
          navigate('/');
        }
      } else {
        navigate('/');
      }
    };

    handleCallback();
  }, [navigate, setAccessToken]);

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center">
      <div className="text-white text-center">
        <h2 className="text-2xl font-bold mb-4">Connecting to Spotify...</h2>
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
      </div>
    </div>
  );
};