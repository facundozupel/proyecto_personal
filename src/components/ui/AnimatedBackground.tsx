import { useEffect, useRef } from 'react';

interface Line {
  x: number;
  y: number;
  length: number;
  angle: number;
  drift: number;
  waveAmp: number;
  phase: number;
  speedMult: number;
}

const LINE_COUNT = 15;
const OPACITY = 0.10;
const SPEED = 1;
const LINE_WIDTH = 1;
const TARGET_FPS = 30;

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let lines: Line[] = [];
    let animId: number;
    let lastFrame = 0;
    const interval = 1000 / TARGET_FPS;

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      w = window.innerWidth;
      h = window.innerHeight;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      canvas!.style.width = w + 'px';
      canvas!.style.height = h + 'px';
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function createLines() {
      lines = [];
      for (let i = 0; i < LINE_COUNT; i++) {
        lines.push({
          x: Math.random() * w,
          y: Math.random() * h,
          length: 200 + Math.random() * 400,
          angle: -0.4 + Math.random() * 0.8,
          drift: (Math.random() - 0.5) * 0.3,
          waveAmp: 10 + Math.random() * 30,
          phase: Math.random() * Math.PI * 2,
          speedMult: 0.5 + Math.random() * 1,
        });
      }
    }

    function draw(time: number) {
      ctx!.clearRect(0, 0, w, h);
      const t = time * 0.001;

      for (const line of lines) {
        const speed = SPEED * 0.05 * line.speedMult;
        const offsetY = Math.sin(t * 0.5 * line.speedMult + line.phase) * line.waveAmp;
        const currentX = line.x + line.drift * t * speed * 60;
        const currentY = line.y + offsetY;

        const wrappedX = ((currentX % (w + line.length)) + w + line.length) % (w + line.length) - line.length * 0.5;

        const dx = Math.cos(line.angle) * line.length;
        const dy = Math.sin(line.angle) * line.length;

        const x1 = wrappedX - dx * 0.5;
        const y1 = currentY - dy * 0.5;
        const x2 = wrappedX + dx * 0.5;
        const y2 = currentY + dy * 0.5;

        const grad = ctx!.createLinearGradient(x1, y1, x2, y2);
        const c = 'rgba(255,255,255,';
        grad.addColorStop(0, c + '0)');
        grad.addColorStop(0.2, c + OPACITY + ')');
        grad.addColorStop(0.5, c + OPACITY + ')');
        grad.addColorStop(0.8, c + OPACITY + ')');
        grad.addColorStop(1, c + '0)');

        ctx!.beginPath();
        ctx!.moveTo(x1, y1);
        ctx!.lineTo(x2, y2);
        ctx!.strokeStyle = grad;
        ctx!.lineWidth = LINE_WIDTH;
        ctx!.stroke();
      }
    }

    function loop(time: number) {
      if (prefersReducedMotion) {
        draw(0);
        return;
      }
      if (time - lastFrame >= interval) {
        lastFrame = time;
        draw(time);
      }
      animId = requestAnimationFrame(loop);
    }

    resize();
    createLines();
    window.addEventListener('resize', handleResize);

    function handleResize() {
      resize();
      createLines();
    }

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    />
  );
}
