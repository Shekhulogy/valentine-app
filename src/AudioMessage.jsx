import { useEffect, useRef, useState } from "react";
import AudioWave from "./AudioWave";
import playIcon from "./assets/play-icon.svg"
import pauseIcon from "./assets/pause-icon.svg"

export default function AudioMessage({ 
    audioFile,
    onProgress,
    hasPlayed,
    markPlayed, 
    onAudioReady, 
}) {

    console.log("hasPlayed",hasPlayed)
    
    const audioRef = useRef(null);
    const [playing, setPlaying] = useState(false);


    useEffect(() => {
        if (audioRef.current) {
        onAudioReady?.(audioRef.current); // 🔑 hook ko audio do
        }
    }, []);

    
    useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (hasPlayed) return;

    audio.currentTime = 0;

    audio.play().then(() => {
      setPlaying(true);
    }).catch(() => {});
  }, [hasPlayed]);
    
    const togglePlay = () => {
        if (!audioRef.current) return;

        if (audioRef.current.paused) {
            audioRef.current.play();
            setPlaying(true);
        } else {
            audioRef.current.pause();
            setPlaying(false);
        }
    };

    return (
        <div className="flex items-center gap-3 bg-green-100 border border-green-300 rounded-full px-4 py-2 shadow-md">
            <button
                onClick={togglePlay}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-green-500 text-white"
            >
                <img src={playing ? pauseIcon : playIcon} alt="" />
                
            </button>

            <AudioWave audioRef={audioRef} playing={playing} />

            <audio
                ref={audioRef}
                src={audioFile}
                onTimeUpdate={() => {
                    onProgress?.(audioRef.current.currentTime);
                }}
                onEnded={() => {
                    setPlaying(false);
                    markPlayed?.();
                }}
            />
        </div>
    );
}
