import React, { useEffect, useRef } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface Star {
    x: number;
    y: number;
    baseX: number;
    baseY: number;
    size: number;
    opacity: number;
    speed: number;
    offset: number;
}

export const StarryBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { theme } = useTheme();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let stars: Star[] = [];
        let width = window.innerWidth;
        let height = window.innerHeight;

        // Mouse state
        let mouseX = 0;
        let mouseY = 0;
        let targetMouseX = 0;
        let targetMouseY = 0;

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            initStars();
        };

        const handleMouseMove = (e: MouseEvent) => {
            // Normalize mouse position from -1 to 1
            targetMouseX = (e.clientX / width) * 2 - 1;
            targetMouseY = (e.clientY / height) * 2 - 1;
        };

        const initStars = () => {
            const starCount = Math.floor((width * height) / 4000); // Density based on screen size
            stars = [];
            for (let i = 0; i < starCount; i++) {
                const x = Math.random() * width;
                const y = Math.random() * height;
                stars.push({
                    x,
                    y,
                    baseX: x,
                    baseY: y,
                    size: Math.random() * 2 + 0.5, // Small stars
                    opacity: Math.random() * 0.5 + 0.1,
                    speed: Math.random() * 0.05 + 0.01,
                    offset: Math.random() * Math.PI * 2,
                });
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            // Smooth mouse easing
            mouseX += (targetMouseX - mouseX) * 0.05;
            mouseY += (targetMouseY - mouseY) * 0.05;

            // Set star color based on theme
            const isDark = document.documentElement.classList.contains('dark');
            ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.5)';

            stars.forEach((star) => {
                // Gentle bounce animation (sine wave)
                const bounce = Math.sin(Date.now() * 0.001 * star.speed + star.offset) * 5;

                // Parallax effect based on cursor
                // Stars move slightly opposite to mouse
                const parallaxX = mouseX * 20 * star.speed * 5;
                const parallaxY = mouseY * 20 * star.speed * 5;

                // Apply positions
                const x = star.baseX + parallaxX;
                const y = star.baseY + bounce + parallaxY;

                // Draw star
                ctx.globalAlpha = star.opacity + (Math.sin(Date.now() * 0.002 + star.offset) * 0.1); // Twinkle
                ctx.beginPath();
                ctx.arc(x, y, star.size, 0, Math.PI * 2);
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        // Initialize
        handleResize();
        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, [theme]); // Re-init if theme changes to handle color update immediately

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none transition-opacity duration-1000"
            style={{ opacity: 0.6 }} // Adjust global visibility
        />
    );
};
