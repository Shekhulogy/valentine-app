import { useState, useEffect, useRef } from "react";
import AudioMessage from "../AudioMessage";
import SwipeIndicator from "./SwipeIndocator";
import Eyes from "../assets/eyes.jpg"
import Smile from "../assets/smile.jpg"
import AllOfYou from "../assets/all-of-you.jpg"


const images = [
  Eyes,
  Smile,
  AllOfYou,
];

export default function FlipGalleryCard({ unlockSwipe,  hasPlayed, markPlayed, }) {

  const [flipped, setFlipped] = useState([false, false, false]);
  const [burst, setBurst] = useState(null);
  const [showIndicator, setShowIndicator] = useState(false);
const unlockedRef = useRef(false);

  const handleFlip = (index) => {
  if (flipped[index]) return;

  setTimeout(() => {
    setFlipped((prev) => {
      const copy = [...prev];
      copy[index] = true;

      // 🔑 CHECK: kya teeno cards flip ho gaye?
      const flippedCount = copy.filter(Boolean).length;

      if (flippedCount === 3 && !unlockedRef.current) {
        unlockedRef.current = true;
        setShowIndicator(true);
        unlockSwipe?.(); // 👈 swipe unlock yahin hoga
      }

      return copy;
    });

    setBurst(index);
    setTimeout(() => setBurst(null), 700);
  }, index * 180);
};


  useEffect(() => {
    console.log("FlipGalleryCard MOUNT");
  
    return () => {
      console.log("FlipGalleryCard UNMOUNT");
    };
  }, []);

  return (
    <div className="relative h-full w-full flex flex-col items-center justify-between px-4 py-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-pink-600 text-center">What i like most about you</h2>
      </div>
      {/* 🖼 Cards */}
      <div className="flex flex-row
        items-center justify-center
        gap-4 md:gap-8
        mt-6 flex-1">
        {images.map((img, i) => (
          <div key={i} className="premium-card" onClick={() => handleFlip(i)}>
            {burst === i && (
              <div className="heart-burst">
                {Array.from({ length: 5 }).map((_, h) => (
                  <span key={h}>💖</span>
                ))}
              </div>
            )}

            <div className={`premium-inner ${flipped[i] ? "flipped" : ""}`}>
              <div className="premium-front flex items-center justify-center">
                <span className="text-pink-600 font-medium">CLICK ME</span>
              </div>

              <div className="premium-back">
                <img src={img} alt="" className="w-full h-full object-cover"/>
              </div>
            </div>
          </div>
        ))}
      </div>

      <SwipeIndicator show = {showIndicator}/>
    </div>
  );
}
