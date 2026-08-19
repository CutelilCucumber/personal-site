'use client';

import { useEffect, useRef, useState } from 'react';

const WIDTH = 300;
const HEIGHT = 420;
const BALL_RADIUS = 9;
const START_BALLS = 9;
const FRICTION = 0.985;
const MIN_SPEED = 0.35;

interface Hole {
  x: number;
  y: number;
  r: number;
  points: number;
  color: string;
}

const HOLES: Hole[] = [
  { x: WIDTH / 2, y: 60, r: 16, points: 50, color: '#ff2d95' },
  { x: WIDTH / 2 - 60, y: 78, r: 20, points: 20, color: '#00e5ff' },
  { x: WIDTH / 2 + 60, y: 78, r: 20, points: 20, color: '#00e5ff' },
  { x: WIDTH / 2 - 110, y: 110, r: 24, points: 10, color: '#ffd400' },
  { x: WIDTH / 2 + 110, y: 110, r: 24, points: 10, color: '#ffd400' },
];

const LANE_TOP = 40;
const START_X = WIDTH / 2;
const START_Y = HEIGHT - 40;

interface BallState {
  x: number;
  y: number;
  vx: number;
  vy: number;
  moving: boolean;
}

export default function SkeeBallGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ballRef = useRef<BallState>({ x: START_X, y: START_Y, vx: 0, vy: 0, moving: false });
  const dragRef = useRef<{ startX: number; startY: number; active: boolean }>({
    startX: 0,
    startY: 0,
    active: false,
  });

  const [score, setScore] = useState(0);
  const [ballsLeft, setBallsLeft] = useState(START_BALLS);
  const [lastPoints, setLastPoints] = useState<number | null>(null);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem('skeeball-high-score');
    if (saved) setHighScore(parseInt(saved, 10) || 0);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frame: number;

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, WIDTH, HEIGHT);

      // lane
      ctx.fillStyle = '#0c0620';
      ctx.fillRect(0, 0, WIDTH, HEIGHT);
      ctx.strokeStyle = '#3a1f5c';
      ctx.lineWidth = 2;
      ctx.strokeRect(1, 1, WIDTH - 2, HEIGHT - 2);

      // holes
      HOLES.forEach((hole) => {
        ctx.beginPath();
        ctx.arc(hole.x, hole.y, hole.r, 0, Math.PI * 2);
        ctx.fillStyle = '#000';
        ctx.fill();
        ctx.lineWidth = 3;
        ctx.strokeStyle = hole.color;
        ctx.stroke();
        ctx.font = '10px monospace';
        ctx.fillStyle = hole.color;
        ctx.textAlign = 'center';
        ctx.fillText(String(hole.points), hole.x, hole.y + 4);
      });

      // ball
      const ball = ballRef.current;
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, BALL_RADIUS, 0, Math.PI * 2);
      ctx.fillStyle = '#f3eeff';
      ctx.shadowColor = '#00e5ff';
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;

      // aim line while dragging
      const drag = dragRef.current;
      if (drag.active) {
        ctx.beginPath();
        ctx.moveTo(ball.x, ball.y);
        const dx = drag.startX - ball.x;
        const dy = drag.startY - ball.y;
        ctx.lineTo(ball.x - dx * 0.6, ball.y - dy * 0.6);
        ctx.strokeStyle = '#ff2d95';
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    }

    function step() {
      const ball = ballRef.current;

      if (ball.moving) {
        ball.x += ball.vx;
        ball.y += ball.vy;
        ball.vx *= FRICTION;
        ball.vy *= FRICTION;

        // side walls
        if (ball.x - BALL_RADIUS < 0 || ball.x + BALL_RADIUS > WIDTH) {
          ball.vx *= -0.6;
          ball.x = Math.max(BALL_RADIUS, Math.min(WIDTH - BALL_RADIUS, ball.x));
        }

        const speed = Math.hypot(ball.vx, ball.vy);

        // reached the top - check hole collisions
        if (ball.y - BALL_RADIUS <= LANE_TOP) {
          let scored: Hole | null = null;
          for (const hole of HOLES) {
            const dist = Math.hypot(ball.x - hole.x, ball.y - hole.y);
            if (dist < hole.r) {
              scored = hole;
              break;
            }
          }
          resolveThrow(scored ? scored.points : 0);
        } else if (speed < MIN_SPEED) {
          // ran out of steam before reaching the top
          resolveThrow(0);
        }
      }

      draw();
      frame = requestAnimationFrame(step);
    }

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function resolveThrow(points: number) {
    ballRef.current = { x: START_X, y: START_Y, vx: 0, vy: 0, moving: false };
    setLastPoints(points);
    setScore((prevScore) => {
      const next = prevScore + points;
      setBallsLeft((prevBalls) => {
        const remaining = prevBalls - 1;
        if (remaining <= 0) {
          setGameOver(true);
          setHighScore((prevHigh) => {
            const newHigh = Math.max(prevHigh, next);
            window.localStorage.setItem('skeeball-high-score', String(newHigh));
            return newHigh;
          });
        }
        return remaining;
      });
      return next;
    });
  }

  function getPos(e: React.PointerEvent<HTMLCanvasElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / rect.width) * WIDTH,
      y: ((e.clientY - rect.top) / rect.height) * HEIGHT,
    };
  }

  function handlePointerDown(e: React.PointerEvent<HTMLCanvasElement>) {
    if (ballRef.current.moving || gameOver) return;
    const pos = getPos(e);
    dragRef.current = { startX: pos.x, startY: pos.y, active: true };
  }

  function handlePointerMove(e: React.PointerEvent<HTMLCanvasElement>) {
    if (!dragRef.current.active) return;
    const pos = getPos(e);
    dragRef.current.startX = pos.x;
    dragRef.current.startY = pos.y;
  }

  function handlePointerUp() {
    const drag = dragRef.current;
    if (!drag.active) return;
    drag.active = false;

    const ball = ballRef.current;
    const dx = drag.startX - ball.x;
    const dy = drag.startY - ball.y;

    // must pull down/back to launch upward
    if (dy > 15) {
      const power = Math.min(Math.hypot(dx, dy) * 0.18, 14);
      const angle = Math.atan2(-dy, dx);
      ballRef.current = {
        ...ball,
        vx: Math.cos(angle) * power,
        vy: Math.sin(angle) * power,
        moving: true,
      };
    }
  }

  function resetGame() {
    setScore(0);
    setBallsLeft(START_BALLS);
    setLastPoints(null);
    setGameOver(false);
    ballRef.current = { x: START_X, y: START_Y, vx: 0, vy: 0, moving: false };
  }

  return (
    <div className="skeeball">
      <div className="skeeball-hud">
        <span>SCORE: {score}</span>
        <span>BALLS: {ballsLeft}</span>
        <span>HIGH: {highScore}</span>
      </div>

      <canvas
        ref={canvasRef}
        width={WIDTH}
        height={HEIGHT}
        className="skeeball-canvas"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      />

      <p className="skeeball-hint">
        {gameOver
          ? `GAME OVER — final score ${score}`
          : lastPoints === null
            ? 'Pull down from the ball, release to throw'
            : `+${lastPoints} pts`}
      </p>

      {gameOver && (
        <button className="skeeball-reset" onClick={resetGame}>
          INSERT COIN
        </button>
      )}
    </div>
  );
}
