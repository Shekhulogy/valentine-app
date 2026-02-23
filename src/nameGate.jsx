import { useState, useRef, useEffect } from "react";

export default function NameGate({ onSubmit }) {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 300);
  }, []);

  const handleOnChange = (e) => {
    if (e.target.value === "") {
      setError(false);
    }
    setName(e.target.value);
  };

  const capitalizeName = (fullName) => {
    const splitName = fullName.split(" ");
    for (let i = 0; i < splitName.length; i++) {
      splitName[i] =
        splitName[i].charAt(0).toUpperCase() +
        splitName[i].slice(1).toLowerCase();
    }
    return splitName.join(" ");
  };

  const handleSubmit = () => {
    if (
      name === "Komal" ||
      name === "Komal Yadav" ||
      name === "komal" ||
      name === "komal yadav" ||
      name === "Komal yadav"
    ) {
      setError(false);
      const payload = {
        value: capitalizeName(name),
      };

      sessionStorage.setItem("valentine_name", JSON.stringify(payload));
      onSubmit(payload.value);
      return;
    } else {
      setError(true);
    }
  };

  return (
    <div
      id="name-gate"
      className="
        bg-white rounded-3xl shadow-2xl 
        px-6 py-8 sm:px-10 sm:py-10
        w-[90vw] max-w-[420px]
        text-center animate-fade-in z-10
      "
    >
      <div className="text-5xl mb-4">💌</div>

      <h2 className="text-xl sm:text-2xl font-bold text-pink-600 mb-2">
        What’s your name?
      </h2>

      <p className="text-sm sm:text-base text-gray-500 mb-4">
        I promise it’s important 🥺
      </p>

      <div className="transition-discrete delay-400 duration-300 ease-in-out">
        {error && (
          <p className="text-red-400 text-left mb-1">
            Sorry, It's only for my psandida aurat and if you'r intentionally
            entering wrong name then please "Enter your real name"
          </p>
        )}
        <input
          type="text"
          ref={inputRef}
          value={name}
          onChange={handleOnChange}
          placeholder="Enter your name 💕"
          className={`
                  w-full px-4 py-3 text-base
                  border border-gray-300 rounded-xl
                  outline-none appearance-none
                  focus:outline-none focus:ring-2 focus:ring-pink-400
                  focus:border-pink-400
                  focus:shadow-[0_0_0_2px_rgba(236,72,153,0.25)]
                  mb-4
                  ${error ? "animate-shake border-red-400" : ""}
              `}
        />
      </div>

      <button
        id="name-submit"
        disabled={!name.trim()}
        onClick={handleSubmit}
        className="
          w-full py-3 rounded-full 
          bg-pink-500 text-white font-semibold
          shadow-lg disabled:opacity-50
          transition active:scale-95
        "
      >
        Continue 💖
      </button>
    </div>
  );
}
