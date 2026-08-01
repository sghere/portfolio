import { useEffect, useRef } from 'react';

export function AnimatedBackground({ theme }: { theme: 'dark' | 'light' }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = width / 2;
    let mouseY = height / 2;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    // Grid dots configuration
    const spacing = 36;
    const dots: { x: number; y: number; baseAlpha: number }[] = [];

    for (let x = 0; x < width; x += spacing) {
      for (let y = 0; y < height; y += spacing) {
        dots.push({
          x,
          y,
          baseAlpha: Math.random() * 0.12 + 0.04,
        });
      }
    }

    let time = 0;

    const render = () => {
      time += 0.008;
      ctx.clearRect(0, 0, width, height);

      const isDark = theme === 'dark';
      const dotColor = isDark ? '255, 255, 255' : '15, 23, 42';

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        const dx = mouseX - dot.x;
        const dy = mouseY - dot.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let glow = 0;
        if (dist < 180) {
          glow = (1 - dist / 180) * 0.45;
        }

        const wave = Math.sin(time + dot.x * 0.01 + dot.y * 0.01) * 0.03;
        const alpha = Math.min(0.8, dot.baseAlpha + glow + wave);

        ctx.fillStyle = `rgba(${dotColor}, ${alpha})`;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, glow > 0 ? 1.5 : 1, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw faint connecting lines near mouse cursor
      for (let i = 0; i < dots.length; i++) {
        const d1 = dots[i];
        const distToMouse = Math.hypot(mouseX - d1.x, mouseY - d1.y);
        if (distToMouse < 100) {
          ctx.strokeStyle = `rgba(${isDark ? '99, 102, 241' : '79, 70, 229'}, ${0.15 * (1 - distToMouse / 100)})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(d1.x, d1.y);
          ctx.lineTo(mouseX, mouseY);
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-700"
    />
  );
}
