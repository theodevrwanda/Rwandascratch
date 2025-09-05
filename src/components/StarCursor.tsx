import React, { useEffect, useState, useCallback } from 'react';
import { Star } from 'lucide-react';

interface StarParticle {
  id: number;
  x: number;
  y: number;
  opacity: number;
  scale: number;
  rotation: number;
  velocity: { x: number; y: number };
}

export function StarCursor() {
  const [stars, setStars] = useState<StarParticle[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const createStar = useCallback((x: number, y: number) => {
    const newStar: StarParticle = {
      id: Date.now() + Math.random(),
      x: x + (Math.random() - 0.5) * 30,
      y: y + (Math.random() - 0.5) * 30,
      opacity: 1,
      scale: Math.random() * 0.5 + 0.3,
      rotation: Math.random() * 360,
      velocity: {
        x: (Math.random() - 0.5) * 2,
        y: (Math.random() - 0.5) * 2,
      },
    };
    return newStar;
  }, []);

  useEffect(() => {
    let frameId: number;
    
    const animateStars = () => {
      setStars(prevStars => 
        prevStars
          .map(star => ({
            ...star,
            x: star.x + star.velocity.x,
            y: star.y + star.velocity.y,
            opacity: star.opacity - 0.02,
            rotation: star.rotation + 2,
            scale: star.scale * 0.99,
          }))
          .filter(star => star.opacity > 0)
      );
      frameId = requestAnimationFrame(animateStars);
    };

    frameId = requestAnimationFrame(animateStars);
    return () => cancelAnimationFrame(frameId);
  }, []);

  useEffect(() => {
    let throttleTimeout: NodeJS.Timeout;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      if (!throttleTimeout) {
        throttleTimeout = setTimeout(() => {
          const newStar = createStar(e.clientX, e.clientY);
          setStars(prevStars => [...prevStars.slice(-15), newStar]);
          throttleTimeout = null as any;
        }, 50);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (throttleTimeout) clearTimeout(throttleTimeout);
    };
  }, [createStar]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {stars.map(star => (
        <div
          key={star.id}
          className="absolute transition-all duration-75 ease-out"
          style={{
            left: star.x - 8,
            top: star.y - 8,
            opacity: star.opacity,
            transform: `scale(${star.scale}) rotate(${star.rotation}deg)`,
          }}
        >
          <Star 
            size={16}
            className="text-blue-500 dark:text-white fill-current drop-shadow-sm"
            style={{
              filter: 'drop-shadow(0 0 4px currentColor)',
            }}
          />
        </div>
      ))}
    </div>
  );
}