import React, { useState, useEffect, useRef } from "react";

const CalculateTimeRemaining = (expiration) => {
  if (!expiration) {
    return null;
  }

  const now = Date.now();
  const target = expiration;
  const difference = target - now;

  const hours = Math.floor(difference / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  return { hours, minutes, seconds };
};

export const CountdownTimer = ({ expiration = null }) => {
  const [timeRemaining, setTimeRemaining] = useState(
    CalculateTimeRemaining(expiration)
  );
  const interval = useRef(null);

  useEffect(() => {
    if (expiration) {
      interval.current = setInterval(() => {
        setTimeRemaining(CalculateTimeRemaining(expiration));
      }, 1000);

      return () => clearInterval(interval.current);
    } else {
      clearInterval(interval.current);
      setTimeRemaining(null);
    }
  }, [expiration]);

  if (!timeRemaining) {
    return <></>;
  }

  return (
    <div className="de_countdown">
      {timeRemaining.hours}h {timeRemaining.minutes}m {timeRemaining.seconds}s
    </div>
  );
};
