import { useEffect, useRef, useState, useCallback } from "react";

export const useTimer = () => {
  const [elapsedMs, setElapsedMs] = useState(0);
  const [running, setRunning] = useState(false);
  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  const tick = useCallback((now: number) => {
    if (startTimeRef.current !== null) {
      setElapsedMs(now - startTimeRef.current);
      rafRef.current = requestAnimationFrame(tick);
    }
  }, []);

  const start = useCallback(() => {
    if (running) return;
    setRunning(true);
    startTimeRef.current = performance.now();
    rafRef.current = requestAnimationFrame(tick);
  }, [running, tick]);

  const stop = useCallback(() => {
    setRunning(false);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
  }, []);

  const reset = useCallback(() => {
    setElapsedMs(0);
    startTimeRef.current = performance.now();
  }, []);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const elapsedSeconds = Math.floor(elapsedMs / 1000);
  const minutes = Math.floor(elapsedSeconds / 60);
  const seconds = elapsedSeconds % 60;
  const formatted = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return { elapsedMs, elapsedSeconds, formatted, running, start, stop, reset };
};
