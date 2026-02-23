import { useEffect, useRef, useState } from "react";
import { lyrics } from "../lyricsData";
import AudioFile from "../assets/lyrics-audio.mp3";
import useAudioSwipeGate from "../hooks/useAudioSwipeGate";
import SwipeIndicator from "./SwipeIndocator";
import AudioMessage from "../AudioMessage";
import DreamPic from "../assets/dream.png";

export default function LyricsCard({ unlockSwipe, hasPlayed, markPlayed }) {
  const { showIndicator, attachAudio } = useAudioSwipeGate({
    unlockAfter: 3,
    onUnlock: unlockSwipe,
  });

  const [audioEl, setAudioEl] = useState(null);
  const [currentLine, setCurrentLine] = useState(0);

  const [isMobile, setIsMobile] = useState(false);
  const [showLyrics, setShowLyrics] = useState(false);

  const lyricsContainerRef = useRef(null);
  const lineRefs = useRef([]);

  /* 🔊 Sync lyrics with audio */
  useEffect(() => {
    if (!audioEl) return;

    const syncLyrics = () => {
      const time = audioEl.currentTime;
      for (let i = lyrics.length - 1; i >= 0; i--) {
        if (time >= lyrics[i].time) {
          setCurrentLine(i);
          break;
        }
      }
    };

    audioEl.addEventListener("timeupdate", syncLyrics);
    return () => {
      audioEl.pause();
      audioEl.removeEventListener("timeupdate", syncLyrics);
    };
  }, [audioEl]);

  /* 🎯 Smooth auto-scroll */
  useEffect(() => {
    const container = lyricsContainerRef.current;
    const line = lineRefs.current[currentLine];
    if (!container || !line) return;

    const containerHeight = container.clientHeight;
    const maxScroll = container.scrollHeight - containerHeight;

    const target = line.offsetTop - containerHeight / 2 + line.clientHeight / 2;

    container.scrollTo({
      top: Math.max(0, Math.min(target, maxScroll)),
      behavior: "smooth",
    });
  }, [currentLine]);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreen(); // initial check
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  useEffect(() => {
    if (!audioEl) return;

    const handlePlay = () => setShowLyrics(true);
    const handleEnd = () => setShowLyrics(false);

    audioEl.addEventListener("play", handlePlay);
    audioEl.addEventListener("ended", handleEnd);

    return () => {
      audioEl.removeEventListener("play", handlePlay);
      audioEl.removeEventListener("ended", handleEnd);
    };
  }, [audioEl]);

  console.log("showIndicator:", showIndicator);

  return (
    <div className="relative w-full h-full ">
      {/* ================= MOBILE LAYOUT ================= */}
      {isMobile && (
        <div className="md:hidden absolute inset-0 z-10">
          {/* Image background */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-[90%] aspect-[3.4/4] rounded-2xl overflow-hidden border-4 border-pink-300">
              <img
                src={DreamPic}
                className="w-full h-full object-cover"
                alt="Her"
              />
            </div>
          </div>

          {/* Lyrics overlay */}
          <div className="relative z-10 h-full flex flex-col justify-between px-4 py-4">
            <div
              ref={lyricsContainerRef}
              className={`items-center flex-1 overflow-y-auto px-10 py-6
                       text-base text-gray-200
                       rounded-2xl no-scrollbar lyrics-mask
                       ${showLyrics ? "opacity-100 " : "opacity-0"}
                       `}
            >
              {lyrics.map((line, i) => (
                <p
                  key={i}
                  ref={(el) => (lineRefs.current[i] = el)}
                  className={`mb-4 transition-all duration-500 ${
                    i === currentLine
                      ? "text-pink-600 font-bold scale-105"
                      : "opacity-40"
                  }
                  `}
                >
                  {line.text}
                </p>
              ))}
            </div>

            {/* Audio */}
            <div className="flex justify-center -mb-6 md:mb-0 md:mt-3">
              <AudioMessage
                audioFile={AudioFile}
                hasPlayed={hasPlayed}
                markPlayed={markPlayed}
                onAudioReady={(audio) => {
                  attachAudio(audio);
                  setAudioEl(audio);
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* ================= DESKTOP LAYOUT ================= */}
      {!isMobile && (
        <div className="hidden md:flex w-full h-full items-center gap-6 px-4">
          {/* Lyrics */}
          <div className="flex flex-col flex-1 h-full">
            <div
              ref={lyricsContainerRef}
              className="flex-1 overflow-y-auto px-4 py-4 text-lg text-gray-700 no-scrollbar lyrics-mask"
            >
              {lyrics.map((line, i) => (
                <p
                  key={i}
                  ref={(el) => (lineRefs.current[i] = el)}
                  className={`mb-4 transition-all duration-500 ${
                    i === currentLine
                      ? "text-pink-600 font-semibold scale-105"
                      : "opacity-40"
                  }`}
                >
                  {line.text}
                </p>
              ))}
            </div>

            {/* Audio */}
            <div className="flex justify-center pt-3">
              <AudioMessage
                audioFile={AudioFile}
                hasPlayed={hasPlayed}
                markPlayed={markPlayed}
                onAudioReady={(audio) => {
                  attachAudio(audio);
                  setAudioEl(audio);
                }}
              />
            </div>
          </div>

          {/* Image */}
          <div className="w-[38%] h-full flex items-center justify-center">
            <div className="h-[85%] aspect-[3/4] rounded-2xl overflow-hidden border-4 border-pink-300">
              <img
                src={DreamPic}
                className="w-full h-full object-cover"
                alt="Her"
              />
            </div>
          </div>
        </div>
      )}

      {/* Swipe Indicator */}
      <SwipeIndicator show={showIndicator} />
    </div>
  );
}
