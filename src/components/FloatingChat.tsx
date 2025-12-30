import React, { useState } from 'react';
import { MessageCircle, Twitter, Instagram, Linkedin, Github, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const socialLinks = [
  { name: 'WhatsApp', href: 'https://wa.me/250792734752', icon: MessageCircle, color: 'text-green-500', bg: 'bg-green-100 hover:bg-green-200' },
  { name: 'Twitter', href: 'https://www.x.com/theo_dev_rw', icon: Twitter, color: 'text-blue-400', bg: 'bg-blue-100 hover:bg-blue-200' },
  { name: 'Instagram', href: 'https://www.instagram.com/rwandascratch/', icon: Instagram, color: 'text-pink-500', bg: 'bg-pink-100 hover:bg-pink-200' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/theogene-iradukunda-88b07a381/', icon: Linkedin, color: 'text-blue-700', bg: 'bg-blue-100 hover:bg-blue-200' },
  { name: 'GitHub', href: 'https://github.com/theodevrwanda', icon: Github, color: 'text-gray-800 dark:text-gray-200', bg: 'bg-gray-100 hover:bg-gray-200' },
];

export function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center">
      {/* Radial Menu Items */}
      <div className={cn(
        "absolute bottom-0 right-0 w-14 h-14 flex items-center justify-center transition-all duration-300",
        isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"
      )}>
        {socialLinks.map((social, index) => {
          // Calculate position in a semi-circle or arc
          // For a simple radial effect around the button, we can maintain fixed positions
          // relative to the center button. Let's arrange them in a vertical stack or arc.
          // Since "around" was requested, let's do a vertical stack for simplicity and better mobile UX, 
          // or we can use absolute positioning for a true "radial" spread.

          // Let's do a radial spread:
          const angle = (index * (90 / (socialLinks.length - 1))) + 180; // 180 to 270 degrees (bottom-left to top-left quadrant relative to button? No, we want top-left relative to bottom-right button)
          // Actually, let's do a simple arc from top to left.
          // Button is at bottom-right. We want icons to appear above and to the left.
          // 0 degrees is right. -90 is top. -180 is left. 
          // We want the arc from -90 (top) to -180 (left).
          // Let's use simpler fixed offsets for stability.

          const radius = 80; // Distance from center
          const totalAngle = 90; // Quarter circle
          const startAngle = -90; // Top
          // Distribute evenly
          const step = totalAngle / (socialLinks.length - 1);
          const currentAngle = startAngle - (index * step); // -90, -112.5, ...
          const radian = (currentAngle * Math.PI) / 180;

          const tx = Math.cos(radian) * radius;
          const ty = Math.sin(radian) * radius;

          return (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "absolute flex items-center justify-center w-10 h-10 rounded-full shadow-md transition-all duration-300 transform hover:scale-110",
                social.bg,
                isOpen ? "opacity-100 visible" : "opacity-0 invisible"
              )}
              style={{
                transform: isOpen ? `translate(${tx}px, ${ty}px)` : 'translate(0, 0)',
                transitionDelay: `${index * 50}ms`
              }}
              title={social.name}
            >
              <social.icon className={cn("h-5 w-5", social.color)} />
            </a>
          );
        })}
      </div>

      {/* Main Floating Button */}
      <Button
        onClick={toggleOpen}
        variant="hero"
        size="icon"
        className={cn(
          "h-14 w-14 rounded-full shadow-xl transition-all duration-300 z-50",
          isOpen ? "rotate-45 bg-destructive hover:bg-destructive/90 text-destructive-foreground" : "animate-float hover:animate-pulse-glow"
        )}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>
    </div>
  );
}