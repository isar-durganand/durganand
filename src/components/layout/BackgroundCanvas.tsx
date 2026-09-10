import { useEffect, useRef } from 'react';

interface CyberNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
}

export function BackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Track mouse
    const mouse = {
      x: width / 2,
      y: height / 2,
      active: false,
    };

    const isMobile = width < 768;
    const nodeCount = isMobile ? 25 : 55;
    const nodes: CyberNode[] = [];

    const colors = ['#00F0FF', '#FF5500', '#00FF9D', '#7000FF'];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.6 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    let radarAngle = 0;
    let lastTime = performance.now();

    const render = (time: number) => {
      const delta = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      // Deep Sci-Fi Void Background
      ctx.fillStyle = '#030508';
      ctx.fillRect(0, 0, width, height);

      // Sci-Fi Horizon Ambient Glow
      const ambientGlow = ctx.createRadialGradient(
        width * 0.5,
        height * 0.2,
        50,
        width * 0.5,
        height * 0.2,
        width * 0.7
      );
      ambientGlow.addColorStop(0, 'rgba(0, 240, 255, 0.05)');
      ambientGlow.addColorStop(0.5, 'rgba(112, 0, 255, 0.02)');
      ambientGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = ambientGlow;
      ctx.fillRect(0, 0, width, height);

      // Subtle Cyber Grid Lines
      const gridSize = isMobile ? 48 : 64;
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.035)';
      ctx.lineWidth = 0.5;

      ctx.beginPath();
      for (let x = 0; x <= width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y <= height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // Radar Sweep in Corner (Sci-Fi sensor effect)
      radarAngle += 0.8 * delta;
      const radarCenterX = width - 80;
      const radarCenterY = 80;
      const radarRadius = 60;

      if (!isMobile) {
        ctx.save();
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.12)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(radarCenterX, radarCenterY, radarRadius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(radarCenterX, radarCenterY, radarRadius * 0.5, 0, Math.PI * 2);
        ctx.stroke();

        // Crosshairs
        ctx.beginPath();
        ctx.moveTo(radarCenterX - radarRadius, radarCenterY);
        ctx.lineTo(radarCenterX + radarRadius, radarCenterY);
        ctx.moveTo(radarCenterX, radarCenterY - radarRadius);
        ctx.lineTo(radarCenterX, radarCenterY + radarRadius);
        ctx.stroke();

        // Sweeping beam
        const sweepX = radarCenterX + Math.cos(radarAngle) * radarRadius;
        const sweepY = radarCenterY + Math.sin(radarAngle) * radarRadius;
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.4)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(radarCenterX, radarCenterY);
        ctx.lineTo(sweepX, sweepY);
        ctx.stroke();
        ctx.restore();
      }

      // Render Cyber Nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];

        n.x += n.vx * 60 * delta;
        n.y += n.vy * 60 * delta;

        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        // Mouse interaction: gravitate towards laser trail
        if (mouse.active) {
          const dx = mouse.x - n.x;
          const dy = mouse.y - n.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 140) {
            const pull = (140 - dist) / 140;
            n.x -= (dx / dist) * pull * 1.2;
            n.y -= (dy / dist) * pull * 1.2;
          }
        }

        // Draw node with glow
        ctx.save();
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.size, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.globalAlpha = n.alpha;
        ctx.shadowBlur = 6;
        ctx.shadowColor = n.color;
        ctx.fill();
        ctx.restore();

        // Connect nearby nodes with laser vectors
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dist = Math.hypot(n.x - n2.x, n.y - n2.y);
          const maxDist = isMobile ? 80 : 120;

          if (dist < maxDist) {
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle = '#00F0FF';
            ctx.globalAlpha = (1 - dist / maxDist) * 0.12;
            ctx.lineWidth = 0.8;
            ctx.stroke();
            ctx.restore();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1] w-full h-full"
      aria-hidden="true"
    />
  );
}
