import { useRef, useState } from "react";

export default function useAudioSwipeGate({
  unlockAfter = 3,
  onUnlock,
  alreadyUnlocked = false,
}) {
  const unlockedRef = useRef(alreadyUnlocked);
  const [showIndicator, setShowIndicator] = useState(alreadyUnlocked);

  const attachAudio = (audio) => {
    if (!audio || unlockedRef.current) return;

    const onTimeUpdate = () => {
      if (
        audio.duration &&
        audio.currentTime >= audio.duration - unlockAfter &&
        !unlockedRef.current
      ) {
        unlockedRef.current = true;
        setShowIndicator(true);
        onUnlock?.();
      }
    };

    audio.addEventListener("timeupdate", onTimeUpdate);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
    };
  };

  return {
    showIndicator,
    attachAudio, // 👈 IMPORTANT
  };
}
