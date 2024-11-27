import React, { useState } from 'react';
import { Share2, Check, Copy } from 'lucide-react';

interface ShareRoomProps {
  roomId: string;
}

export const ShareRoom: React.FC<ShareRoomProps> = ({ roomId }) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = `${window.location.origin}/join/${roomId}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join my Music Queue Room',
          text: 'Join my music room and let\'s queue some songs together!',
          url: shareUrl,
        });
      } catch (err) {
        console.log('Share failed:', err);
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={handleShare}
        className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
      >
        <Share2 className="w-4 h-4" />
        <span>Share Room</span>
      </button>
      
      <button
        onClick={handleCopy}
        className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
      >
        {copied ? (
          <>
            <Check className="w-4 h-4" />
            <span>Copied!</span>
          </>
        ) : (
          <>
            <Copy className="w-4 h-4" />
            <span>Copy Link</span>
          </>
        )}
      </button>
    </div>
  );
};