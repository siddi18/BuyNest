import React, { useState, useEffect } from "react";

const SaleTime = () => {
  // Initial time: 23:59:59
  const initialTime = { hours: 23, minutes: 59, seconds: 59 };
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;

        if (hours === 0 && minutes === 0 && seconds === 0) {
          return initialTime; // Reset countdown
        }

        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;
            hours--;
          }
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-40 flex flex-col items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-700 text-white shadow-lg rounded-lg">
      <h2 className="text-lg sm:text-xl md:text-2xl font-semibold tracking-widest uppercase animate-pulse">
        ⚡ Limited Time Offer ⚡
      </h2>
      <p className="text-4xl sm:text-5xl md:text-6xl font-mono font-bold bg-black bg-opacity-25 px-6 py-2 rounded-lg mt-3 shadow-xl border-4 border-white">
        {String(timeLeft.hours).padStart(2, "0")}:
        {String(timeLeft.minutes).padStart(2, "0")}:
        {String(timeLeft.seconds).padStart(2, "0")}
      </p>
    </div>
  );
};

export default SaleTime;
