import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import SwipeIndicator from "./SwipeIndocator";
import Roses from "../assets/roses-bouquet.jpg";
import Tulips from "../assets/tulip-bouquet.jpg";
import Lilies from "../assets/lily-bouquet.png";
import Chocolate from "../assets/chocolate-box.jpg";
import Cupcakes from "../assets/cupcake-box.jpg";
import Donut from "../assets/donut-box.jpg";

const flowers = [
  { id: "Roses", img: Roses },
  { id: "Tulips", img: Tulips },
  { id: "Lilies", img: Lilies },
];

const sweets = [
  { id: "Chocolate", img: Chocolate },
  { id: "Cupcakes", img: Cupcakes },
  { id: "Donut", img: Donut },
];

export default function GiftChoiceCard({ userName, unlockSwipe }) {
  const [step, setStep] = useState(1);
  const [flowerChoice, setFlowerChoice] = useState("");
  const [sweetChoice, setSweetChoice] = useState("");
  const [location, setLocation] = useState("");
  const [showSwipe, setShowSwipe] = useState(false);
  const [shake, setShake] = useState(false);
  const [placeholder, setPlaceholder] = useState("Enter your city / address");

  const [completed, setCompleted] = useState(false);

  /* 🔁 Swipe back → show final state */
  useEffect(() => {
    const done = sessionStorage.getItem("gift_choice_completed");
    if (done === "true") {
      setCompleted(true);
      // setShowSwipe(true);
      unlockSwipe();
    }
  }, []);

  const sendGiftEmail = () => {
    emailjs.send(
      "service_mesxb7d",
      "template_u0lkrvi",
      {
        to_name: "Shikhar",
        time: new Date().toLocaleString(),
        from_name: userName,
        flower: flowerChoice,
        sweet: sweetChoice,
        location: location,
        message: `🎁 Gift Preferences from ${userName}`,
      },
      "ePfsR3h539ualGjNT",
    );
  };

  const handleFinalSubmit = () => {
    if (!location.trim()) {
      // ❌ empty input
      setShake(true);
      setPlaceholder("First enter your city / address to move forward");

      setTimeout(() => setShake(false), 400);
      return;
    }

    const data = {
      flowerChoice,
      sweetChoice,
      location,
      savedAt: Date.now(),
    };

    sessionStorage.setItem("gift_choice_data", JSON.stringify(data));
    sessionStorage.setItem("gift_choice_completed", "true");

    sendGiftEmail();

    // 🔓 swipe unlock (audio ke bina)
    setCompleted(true);
    unlockSwipe();
    setShowSwipe(true);
  };

  /* 🎉 FINAL SCREEN */
  if (completed) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center gap-4">
        <h2 className="text-3xl font-bold text-pink-600">It’s a Deal 💖</h2>
        <p className="text-gray-600">I'll takecare of the rest 😉</p>
        <SwipeIndicator show={showSwipe} />
      </div>
    );
  }

  return (
    <div
      className="h-full flex flex-col items-center justify-center px-6 py-8 md:p-6
                      transition-all duration-500"
    >
      {/* 🌸 STEP 1 – FLOWERS */}
      {step === 1 && (
        <div className="animate-fade-in flex flex-col items-center justify-center">
          <h2 className="text-2xl w-xs md:w-full md:text-3xl text-wrap font-bold text-pink-600 text-center">
            What would you like as a gift? 🌸
          </h2>

          <p className="text-center text-gray-600 mt-2">
            Choose your favorite flowers
          </p>

          <div
            className="relative flex flex-row
        items-center justify-between
        gap-4 md:gap-6
        mt-6 flex-1"
          >
            {flowers.map((f) => (
              <button
                key={f.id}
                onClick={() => {
                  setFlowerChoice(f.id);
                  setStep(2);
                }}
                className="relative h-45 w-32 md:h-50 md:w-45 rounded-2xl border-3 border-pink-300 flex items-center justify-center overflow-hidden perspective-[1200px] hover:shadow-[0_0_20px_rgba(255,105,180,0.35),0_10px_30px_rgba(0,0,0,0.15)] hover:-translate-y-1"
              >
                <img
                  src={f.img}
                  alt={f.id}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 🍬 STEP 2 – SWEETS */}
      {step === 2 && (
        <div className="animate-fade-in flex flex-col items-center justify-center">
          <h2 className="text-2xl w-xs md:w-full md:text-3xl text-wrap font-bold text-pink-600 text-center">
            What do you like in sweets? 🍬
          </h2>

          <p className="text-center text-gray-600 mt-2">Pick something sweet</p>

          <div
            className="relative flex flex-row
        items-center justify-between
        gap-4 md:gap-6
        mt-6 flex-1"
          >
            {sweets.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  setSweetChoice(s.id);
                  setStep(3);
                }}
                className="relative h-45 w-32 md:h-50 md:w-45 rounded-2xl border-3 border-pink-300 flex items-center justify-center overflow-hidden perspective-[1200px] hover:shadow-[0_0_20px_rgba(255,105,180,0.35),0_10px_30px_rgba(0,0,0,0.15)] hover:-translate-y-1"
              >
                <img
                  src={s.img}
                  alt={s.id}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 📍 STEP 3 – LOCATION */}
      {step === 3 && (
        <div className="animate-fade-in">
          <h2 className="text-2xl font-bold text-pink-600 text-center">
            Type your location to get your gift 🎁
          </h2>

          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder={placeholder}
            className={`w-full mt-6 px-4 py-3
                         rounded-xl border border-gray-300 outline-none appearance-none focus:outline-none focus:ring-2
                         focus:ring-pink-400 
                         ${shake ? "animate-shake" : ""}`}
          />

          <button
            onClick={handleFinalSubmit}
            className="w-full mt-5 py-3 rounded-xl
                         bg-pink-500 text-white font-semibold
                         hover:bg-pink-600 transition"
          >
            Send My Gift 🎀
          </button>
        </div>
      )}
    </div>
  );
}
