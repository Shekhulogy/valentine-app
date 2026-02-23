import { useRef } from "react";

export default function SwipeContainer({ children, onSwipeUp, onSwipeDown }) {
  const startY = useRef(0);

  const onTouchStart = (e) => {
    startY.current = e.touches[0].clientY;
  };

  const onTouchEnd = (e) => {
    const delta = startY.current - e.changedTouches[0].clientY;
    if (Math.abs(delta) < 60) return;

    if (delta > 0) onSwipeUp?.();
    else onSwipeDown?.();
  };

  const onWheel = (e) => {
    if (e.deltaY > 30) onSwipeUp?.();
    if (e.deltaY < -30) onSwipeDown?.();
  };

  return (
    <div
      className="w-full h-full touch-none"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onWheel={onWheel}
    >
      {children}
    </div>
  );
}
