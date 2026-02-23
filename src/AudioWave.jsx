import { useEffect, useRef } from "react";

export default function VoiceWaveform({ audioRef, playing }) {
  const canvasRef = useRef(null);

  const audioCtxRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);

  const rawDataRef = useRef(null);
  const smoothDataRef = useRef(new Array(40).fill(0));

  const rafRef = useRef(null);

  useEffect(() => {
    if (!audioRef?.current || !canvasRef.current) return;

    // Create AudioContext once
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
    }

    const audioCtx = audioCtxRef.current;

    // Create source + analyser once
    if (!sourceRef.current) {
      sourceRef.current = audioCtx.createMediaElementSource(audioRef.current);
      analyserRef.current = audioCtx.createAnalyser();

      analyserRef.current.fftSize = 2048;
      analyserRef.current.smoothingTimeConstant = 0.8; // extra smooth

      sourceRef.current.connect(analyserRef.current);
      analyserRef.current.connect(audioCtx.destination);

      rawDataRef.current = new Uint8Array(
        analyserRef.current.frequencyBinCount,
      );
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const bars = 40;
    const smoothingFactor = 0.1; // RMS smoothness

    const draw = () => {
      rafRef.current = requestAnimationFrame(draw);

      analyserRef.current.getByteFrequencyData(rawDataRef.current);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const barWidth = canvas.width / bars;
      let x = 0;

      for (let i = 0; i < bars; i++) {
        const raw = rawDataRef.current[i] / 255;

        // 🎯 RMS-style exponential smoothing
        smoothDataRef.current[i] =
          smoothDataRef.current[i] +
          (raw - smoothDataRef.current[i]) * smoothingFactor;

        const barHeight = smoothDataRef.current[i] * canvas.height;

        ctx.fillStyle = "#22c55e";
        ctx.fillRect(
          x,
          canvas.height / 2 - barHeight / 2,
          barWidth - 2,
          barHeight,
        );

        x += barWidth;
      }
    };

    if (playing) {
      audioCtx.resume();
      draw();
    } else {
      cancelAnimationFrame(rafRef.current);
    }

    return () => cancelAnimationFrame(rafRef.current);
  }, [playing]);

  return (
    <canvas ref={canvasRef} width={180} height={40} className="rounded-md" />
  );
}
