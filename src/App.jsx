import { useState, useEffect, useRef } from "react";

import NameGate from "./nameGate";
import ProposalCard from "./components/ProposalCard";
import SuccessCard from "./components/SuccessCard";
import LyricsCard from "./components/LyricsCard";
import SwipeContainer from "./components/SwipeContainer";
import AnimatedView from "./components/AnimatedView";
import FlipGalleryCard from "./components/FlipGalleryCard";
import ConnectCard from "./components/ConnectCard";
import GiftChoiceCard from "./components/GiftChoiceCard";


export default function ValentineApp() {
  
  const [userName, setUserName] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState("up"); // "up" | "down"

const [playedCards, setPlayedCards] = useState({
  success: false,
  lyrics: false,
  flip: false,
  connect: false,
});

const [swipeUnlocked, setSwipeUnlocked] = useState({
  success: false,
  lyrics: false,
  flip: false,
  connect: false,
});

  const isAnimatingRef = useRef(false);

  useEffect(() => {
  const navigationType = performance.getEntriesByType("navigation")[0]?.type;

  if (navigationType === "reload") {
    sessionStorage.clear();
  }
}, []);

  useEffect(() => {
  const stored = localStorage.getItem("valentine_name");

  if (!stored) return;

  try {
    const { value, savedAt } = JSON.parse(stored);
    const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;

    if (Date.now() - savedAt > TWENTY_FOUR_HOURS) {
      localStorage.removeItem("valentine_name");
    }

    setUserName(value);
  } catch {
    // agar corrupt data ho
    localStorage.removeItem("valentine_name");
  }
}, []);



const views = ["proposal", "success", "lyrics", "flip", "gift", "connect"];
const maxIndex = views.length - 1;

const goNext = () => {

  if (isAnimatingRef.current) return;

  if (!isSwipeAllowed(activeIndex)) {
    console.log("⛔ swipe locked for", getCurrentCardKey(activeIndex));
    return;
  }

  if (activeIndex >= maxIndex) return;

  isAnimatingRef.current = true;

  setDirection("up");
  setActiveIndex(i => i + 1);

  console.log("swipe-up");
  console.log("goNext from", activeIndex);

  
};

const goPrev = () => {

  if (isAnimatingRef.current) return;

  if (activeIndex === 0) return;

  if (activeIndex === 1) return;
  
  isAnimatingRef.current = true;

  setDirection("down");
  setActiveIndex(i => i - 1);
  console.log("swipe-down");
  console.log("goPrev from", activeIndex);
};

const getCurrentCardKey = (index) => {
  return views[index];
};

const isSwipeAllowed = (index) => {
  const key = getCurrentCardKey(index);

  // Proposal card hamesha swipe allow kare
  if (key === "proposal") return true;

  return swipeUnlocked[key] === true;
};

const unlockCurrentCardSwipe = (index) => {
  const key = getCurrentCardKey(index);

  if (key === "proposal") return;

  setSwipeUnlocked(prev => ({
    ...prev,
    [key]: true,
  }));
};

const renderCard = (index) => {
  switch (index) {
    case 0:
      return <ProposalCard userName = {userName} setActiveIndex = {setActiveIndex}/>
    case 1:
      return (
        <SuccessCard
          unlockSwipe={() => unlockCurrentCardSwipe(1)}
          hasPlayed={playedCards.success}
          markPlayed={() =>
            setPlayedCards(p => ({ ...p, success: true }))
          }
        />
      );
    case 2:
      return (
        <LyricsCard 
          unlockSwipe={() => unlockCurrentCardSwipe(2)}
          hasPlayed={playedCards.lyrics}
          markPlayed={() =>
            setPlayedCards(p => ({ ...p, lyrics: true }))
          }
        />
      )
    
    case 3:
      return (
        <FlipGalleryCard 
          unlockSwipe={() => unlockCurrentCardSwipe(3)}
          hasPlayed={playedCards.flip}
          markPlayed={() =>
            setPlayedCards(p => ({ ...p, flip: true }))
          }
        />
      )
    
    case 4:
      return (
        <GiftChoiceCard
          userName = {userName}
          unlockSwipe={() => unlockCurrentCardSwipe(4)}
        />
      )
      
    case 5:
     return (
      <ConnectCard />
    );

    default:
      return null;
  }
};



  return (
    <SwipeContainer
            onSwipeUp={goNext}
            onSwipeDown={ goPrev}
            // isLocked={isAnimatingRef.current}
        >
    <div id="app-root" 
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-300 via-pink-200 to-rose-200 overflow-hidden relative"
    >
      

      {!userName ? (<NameGate onSubmit={setUserName} />) : (<div id="valentine-card" 
      className="
  bg-white z-10 rounded-3xl shadow-2xl
  p-6 sm:p-8
  w-[92vw] max-w-[680px]
  h-[420px]
"
>
        
            <div className="relative w-full h-full">
              <AnimatedView 
                cardKey={activeIndex} 
                direction={direction} 
                onDone={() => (isAnimatingRef.current = false)}
              >
                {renderCard(activeIndex)}
              </AnimatedView>

            </div>          
        

      </div>
      )}

      

    </div>
    </SwipeContainer>
  );
}
