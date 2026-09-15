import React, { useRef, useEffect, useCallback } from 'react';

interface Spark {
  x: number;
  y: number;
  angle: number;
  startTime: number;
}

export interface ClickSparkProps {
  sparkColor?: string;
  sparkSize?: number;
  sparkRadius?: number;
  sparkCount?: number;
  duration?: number;
  easing?: 'linear' | 'ease-in' | 'ease-in-out' | 'ease-out';
  extraScale?: number;
  children?: React.ReactNode;
}

export const ClickSpark: React.FC<ClickSparkProps> = ({
  sparkColor = '#FF4B00',
  sparkSize = 10,
  sparkRadius = 15,
  sparkCount = 8,
  duration = 400,
  easing = 'ease-out',
  extraScale = 1.0,
  children
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sparksRef = useRef<Spark[]>([]);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let resizeTimeout: ReturnType<typeof setTimeout>;

    const resizeCanvas = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(dpr, dpr);
      }
    };

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeCanvas, 100);
    };

    window.addEventListener('resize', handleResize);
    resizeCanvas();

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  const easeFunc = useCallback(
    (t: number) => {
      switch (easing) {
        case 'linear':
          return t;
        case 'ease-in':
          return t * t;
        case 'ease-in-out':
          return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        default:
          return t * (2 - t);
      }
    },
    [easing]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;

    const draw = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      sparksRef.current = sparksRef.current.filter((spark) => {
        const elapsed = timestamp - spark.startTime;
        if (elapsed >= duration) {
          return false;
        }

        const progress = elapsed / duration;
        const eased = easeFunc(progress);

        const distance = eased * sparkRadius * extraScale;
        const lineLength = sparkSize * (1 - eased);

        const x1 = spark.x + distance * Math.cos(spark.angle);
        const y1 = spark.y + distance * Math.sin(spark.angle);
        const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
        const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);

        ctx.strokeStyle = sparkColor;
        ctx.lineWidth = 2.5;
        ctx.lineCap = 'round';
        ctx.shadowColor =
          sparkColor === '#ffffff' || sparkColor === '#fff'
            ? 'rgba(0, 0, 0, 0.45)'
            : 'rgba(255, 75, 0, 0.4)';
        ctx.shadowBlur = 4;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        return true;
      });

      animationId = requestAnimationFrame(draw);
    };

    animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [sparkColor, sparkSize, sparkRadius, sparkCount, duration, easeFunc, extraScale]);

  const addSparksAt = useCallback(
    (clientX: number, clientY: number) => {
      const now = performance.now();
      const newSparks: Spark[] = Array.from({ length: sparkCount }, (_, i) => ({
        x: clientX,
        y: clientY,
        angle: (2 * Math.PI * i) / sparkCount,
        startTime: now
      }));

      sparksRef.current.push(...newSparks);
    },
    [sparkCount]
  );

  // Catch clicks anywhere on the landing page, including elements that don't bubble
  useEffect(() => {
    const handleGlobalPointer = (e: MouseEvent | PointerEvent) => {
      addSparksAt(e.clientX, e.clientY);
    };

    window.addEventListener('pointerdown', handleGlobalPointer, { passive: true });
    return () => {
      window.removeEventListener('pointerdown', handleGlobalPointer);
    };
  }, [addSparksAt]);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100%'
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          userSelect: 'none',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          zIndex: 99999
        }}
      />
      {children}
    </div>
  );
};

export default ClickSpark;
