import { useEffect } from "react";
import Audiofile from "../assets/success-audio.mp3";
import AudioMessage from "../AudioMessage";
import yesGif from "../assets/mimibubu.gif";
import useAudioSwipeGate from "../hooks/useAudioSwipeGate";
import SwipeIndicator from "./SwipeIndocator";

const SuccessCard = ({ unlockSwipe, hasPlayed, markPlayed }) => {
  console.log("LyricsCard hasPlayed =", hasPlayed);

  const { showIndicator, attachAudio } = useAudioSwipeGate({
    unlockAfter: 3,
    onUnlock: unlockSwipe,
  });

  useEffect(() => {
    console.log("SuccessCard MOUNT");

    return () => {
      console.log("SuccessCard UNMOUNT");
    };
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center gap-5 h-full px-4 md:px-8 text-center">
      <img id="success-gif" src={yesGif} className="size-[150px] rounded-xl" />
      <h2 id="success-title" className="text-2xl font-bold text-pink-600 ">
        Yayyy! 💖🥰
      </h2>
      <p id="success-text" className="text-gray-600">
        You just made my day!
      </p>

      <AudioMessage
        audioFile={Audiofile}
        hasPlayed={hasPlayed}
        markPlayed={markPlayed}
        onAudioReady={attachAudio}
      />

      <SwipeIndicator show={showIndicator} />
    </div>
  );
};

export default SuccessCard;
