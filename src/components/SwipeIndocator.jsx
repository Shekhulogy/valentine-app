export default function SwipeIndicator({ show }) {
  if (!show) return null;

  return (
    <div className="absolute z-20 bottom-[-70px] flex flex-col items-center animate-fade-in left-1/2 -translate-x-1/2">
      <span className="text-xs text-pink-400 mb-1">
        Swipe up
      </span>
      <div className="w-6 h-10 border-2 border-pink-400 rounded-full flex justify-center">
        <div className="w-1 h-2 bg-pink-400 rounded-full animate-bounce mt-2" />
      </div>
    </div>
  );
}
