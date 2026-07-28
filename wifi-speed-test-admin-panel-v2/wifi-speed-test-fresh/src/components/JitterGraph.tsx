import { useEffect, useRef } from 'react';

interface JitterGraphProps {
  isRunning: boolean;
  value: number;
}

export function JitterGraph({ isRunning, value }: JitterGraphProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dataRef = useRef<number[]>(new Array(50).fill(0));

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update data
      if (isRunning) {
        dataRef.current.push(value + (Math.random() - 0.5) * 5);
      } else {
        dataRef.current.push(0);
      }
      dataRef.current.shift();

      // Draw line
      ctx.beginPath();
      ctx.strokeStyle = '#00ff88';
      ctx.lineWidth = 2;
      ctx.lineJoin = 'round';
      
      const step = canvas.width / (dataRef.current.length - 1);
      dataRef.current.forEach((val, i) => {
        const x = i * step;
        const y = canvas.height - (Math.min(Math.max(val, 0), 100) / 100) * canvas.height;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();

      // Gradient fill
      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, 'rgba(0, 255, 136, 0.2)');
      gradient.addColorStop(1, 'rgba(0, 255, 136, 0)');
      ctx.fillStyle = gradient;
      ctx.fill();

      animationId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animationId);
  }, [isRunning, value]);

  return (
    <div className="w-full h-12 bg-black/20 rounded-lg overflow-hidden border border-white/5">
      <canvas ref={canvasRef} width={400} height={50} className="w-full h-full" />
    </div>
  );
}
