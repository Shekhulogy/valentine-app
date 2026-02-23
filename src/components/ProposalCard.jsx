import { useState, useEffect } from "react";

import TypeWriter from "../typeWriter";
import emailjs from "@emailjs/browser";
import proposal from "../assets/proposal2.gif";
import sad from "../assets/sad.gif";
import crying from "../assets/cat-crying.gif";
import please from "../assets/erm-fingers.gif";
import heartBroken from "../assets/heart-broken.gif";
import knife from "../assets/panda-knife.gif";
import cat from "../assets/peach-cat.gif";
import thinking from "../assets/thinking.gif";

export default function ProposalCard({ userName, setActiveIndex }) {
  const [yesScale, setYesScale] = useState(1);
  const [noPos, setNoPos] = useState({ top: "68%", left: "50%" });
  // const [movedOnce, setMovedOnce] = useState(false);
  const [shake, setShake] = useState(false);
  const [noActivated, setNoActivated] = useState(false);

  const messages = [
    "Are you sure? 🥺",
    "Please think again 💔",
    "Don’t break my heart 😢",
    "I’ll be very sad 🥹",
    "Pretty please? 💕",
    "You’re my only Valentine 😭",
    "Okay… last chance 😳",
  ];
  const [msgIndex, setMsgIndex] = useState(-1);
  const lastMessageIndex = messages.length - 1;

  const moveNo = () => {
    if (msgIndex < lastMessageIndex) {
      const positions = [
        { top: "-10%", left: "20%" }, // ⬆ top off-screen
        { top: "85%", left: "30%" }, // ⬇ bottom off-screen
        { top: "40%", left: "-15%" }, // ⬅ left off-screen
        { top: "30%", left: "90%" }, // ➡ right off-screen
        { top: "-8%", left: "75%" }, // ⬆ corner
        { top: "88%", left: "70%" }, // ⬇ corner
      ];

      const random = positions[Math.floor(Math.random() * positions.length)];
      setNoPos(random);
      setYesScale((s) => s + 0.15);
      setMsgIndex((i) => i + 1);
    }
  };

  const gifs = [cat, thinking, heartBroken, sad, please, crying, knife];
  const [gifMessage, setGifMessage] = useState(proposal);

  useEffect(() => {
    if (msgIndex >= 0 && msgIndex < gifs.length) {
      setGifMessage(gifs[msgIndex]);
    }
  }, [msgIndex]);

  const sendYesEmail = () => {
    emailjs
      .send(
        "service_mesxb7d",
        "template_0gwgdnv",
        {
          to_name: "Shikhar",
          time: new Date().toLocaleString(),
          from_name: userName,
          message: `${userName} clicked YES! 🥰💘`,
        },
        "ePfsR3h539ualGjNT",
      )
      .then(() => {
        console.log("Email sent ❤️");
      })
      .catch((error) => {
        console.error("Email failed:", error);
      });
  };

  const handleNoClick = () => {
    if (!noActivated) {
      setShake(true);
      setNoActivated(true); // activate escape mode
      setMsgIndex((i) => i + 1);

      setTimeout(() => setShake(false), 350);
    } else {
      // tumhara existing logic
      moveNo();
    }
  };

  const isDesktop = window.innerWidth >= 768;

  const handleNoHover = () => {
    if (noActivated && isDesktop) {
      moveNo();
    }
  };

  return (
    <div
      id="proposal-container"
      className="relative flex flex-col items-center justify-center w-full h-full text-center select-none"
    >
      <div
        id="main-heart"
        className="absolute -top-10 md:-top-14 text-5xl animate-bounce"
      >
        💘
      </div>
      <img
        src={gifMessage}
        alt=""
        className="w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] rounded-xl mx-auto"
      />

      <h1 className="text-xl sm:text-2xl font-bold text-pink-600 mt-4 max-w-[90%] mx-auto">
        <TypeWriter
          text={`${userName}, will you be my Valentine? 💖`}
          speed={80}
        />
      </h1>

      <div
        id="button-area"
        className="relative flex items-center justify-center w-full h-[150px]"
      >
        <button
          id="yes-button"
          style={{ transform: `scale(${yesScale})` }}
          onClick={() => {
            setActiveIndex(1);
            sendYesEmail();
          }}
          className="
                      
                      px-6 py-3
                      rounded-full bg-pink-500 text-white
                      font-semibold shadow-lg
                      transition-all duration-300
                    "
        >
          Yes 💕
        </button>

        {msgIndex < lastMessageIndex && (
          <button
            id="no-button"
            onClick={handleNoClick}
            onMouseEnter={handleNoHover}
            style={{
              top: noPos.top,
              left: noPos.left,
              // transform: "translate(-50%, -50%)",
            }}
            className={`
                      absolute min-w-[96px] h-12 px-6
                      rounded-full bg-gray-200 text-gray-700
                      font-semibold shadow-md
                      transition-all duration-300 ease-out
                      active:scale-95
                      ${shake ? "animate-shake" : ""}
                    `}
          >
            No 😢
          </button>
        )}
      </div>
      <p
        id="cute-message"
        className="text-sm text-pink-500 mt-6 font-medium animate-pulse"
      >
        {messages[msgIndex]}
      </p>
    </div>
  );
}

ProposalCard;
