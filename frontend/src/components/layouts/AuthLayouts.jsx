import React, { useState, useEffect } from "react";
import { BsStars } from "react-icons/bs";
import { WiDaySunny } from "react-icons/wi";

const fontLink = document.createElement("link");
fontLink.href =
  "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600&display=swap";
fontLink.rel = "stylesheet";
document.head.appendChild(fontLink);

const quotes = [
  {
    text: "Control your money, or it will control you.",
    author: "Financial Wisdom",
  },
  {
    text: "Do not save what is left after spending, but spend what is left after saving.",
    author: "Warren Buffett",
  },
  {
    text: "A budget is telling your money where to go instead of wondering where it went.",
    author: "Dave Ramsey",
  },
  {
    text: "Beware of little expenses; a small leak will sink a great ship.",
    author: "Benjamin Franklin",
  },
];

const AuthLayouts = ({ children }) => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length);
        setFade(true);
      }, 300);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentQuote = quotes[currentQuoteIndex];

  return (
    <div className="flex flex-col md:flex-row h-screen w-screen overflow-hidden font-sans bg-white">
      {/* Left Side - Quote & Weather */}
      <div className="hidden md:flex w-[40%] h-full relative bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 items-center justify-center flex-col gap-8 p-6">
        {/* Circles */}
        <div className="absolute w-48 h-48 bg-purple-300/30 rounded-full top-10 left-8 blur-3xl animate-pulse" />
        <div className="absolute w-56 h-56 bg-pink-300/30 rounded-full bottom-8 right-10 blur-2xl animate-ping" />

        {/* Quote Box */}
        <div
          className={`bg-white/40 backdrop-blur-md rounded-3xl p-6 text-center shadow-xl border border-white/20 max-w-md z-10 transition-opacity duration-500 ease-in-out ${
            fade ? "opacity-100" : "opacity-0"
          }`}
        >
          <BsStars className="text-purple-600 text-3xl mx-auto mb-3 animate-pulse" />
          <h3 className="text-lg font-semibold text-violet-800 leading-snug">
            “{currentQuote.text}”
          </h3>
          <p className="text-xs text-gray-600 mt-2">– {currentQuote.author}</p>
        </div>

        {/* Weather */}
        <div className="absolute bottom-6 left-6 z-10">
          <div className="bg-white/40 backdrop-blur-lg rounded-xl px-5 py-4 flex items-center gap-4 shadow-sm border border-white/20 max-w-xs">
            <WiDaySunny className="text-yellow-400 text-4xl" />
            <div>
              <h4 className="text-sm font-medium text-violet-700">
                Bhopal, India
              </h4>
              <p className="text-xs text-gray-600">Sunny · 31°C</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form Section */}
      <div className="w-full md:w-[60%] h-full overflow-y-auto bg-white px-6 sm:px-12 pt-8 pb-6 flex flex-col">
        {/* Centered Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <h2
            className="text-3xl sm:text-4xl mb-2"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "#6D28D9",
            }}
          >
            Expense Tracker
          </h2>
          <p className="text-sm text-gray-500">
            Your digital finance companion. Stay in control.
          </p>
        </div>

        {/* Form Content */}
        <div className="flex-grow">{children}</div>

        <footer className="text-[11px] text-gray-400 text-center mt-10 mb-2">
          © 2025 All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default AuthLayouts;
