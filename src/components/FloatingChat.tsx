import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function FloatingChat() {
  const navigate = useNavigate();

  const handleChatButtonClick = () => {
    // Navigate to the '/chat' page using useNavigate
    navigate('/chat');
  };

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={handleChatButtonClick}
          variant="hero"
          size="icon"
          className="h-14 w-14 rounded-full shadow-xl animate-float hover:animate-pulse-glow"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
    </>
  );
}