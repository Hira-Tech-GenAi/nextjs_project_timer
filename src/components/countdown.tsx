"use client"; // If this is for Next.js, this directive should be correct.

import { useState, useEffect, useRef, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import React from "react";


const Countdown = () => {
  const [duration, setDuration] = useState<number | string>(""); // To input duration
  const [timeLeft, setTimeLeft] = useState<number>(0); // To track remaining time
  const [isRunning, setIsRunning] = useState<boolean>(false); // To manage start/stop
  const [isPaused, setIsPaused] = useState<boolean>(false); // To handle pause state
  const timeRef = useRef<NodeJS.Timeout | null>(null); // For storing the interval

  // Start countdown function
  const handleStart = (): void => {
    if (typeof duration === "number" && duration > 0) {
      setTimeLeft(duration);
      setIsRunning(true);
      setIsPaused(false);

      if (timeRef.current) {
        clearInterval(timeRef.current);
      }

      timeRef.current = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    }
  };

  // Pause countdown
  const handlePause = (): void => {
    if (timeRef.current) {
      clearInterval(timeRef.current);
    }
    setIsPaused(true);
    setIsRunning(false);
  };

  // Resume countdown
  const handleResume = (): void => {
    if (!isPaused || timeLeft <= 0) return;

    setIsRunning(true);
    setIsPaused(false);

    timeRef.current = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);
  };

  // Reset countdown
  const handleReset = (): void => {
    if (timeRef.current) {
      clearInterval(timeRef.current);
    }
    setTimeLeft(0);
    setIsRunning(false);
    setIsPaused(false);
  };

  // Stop countdown when time is up
  useEffect(() => {
    if (timeLeft === 0 && isRunning) {
      clearInterval(timeRef.current!);
      setIsRunning(false);
    }
  }, [timeLeft, isRunning]);

  // Handle input change
  const handleDurationChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setDuration(Number(e.target.value));
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <Input
        type="number"
        placeholder="Enter duration in seconds"
        value={duration}
        onChange={handleDurationChange}
        className="border p-2 rounded-md w-64"
      />
      <div className="text-lg font-bold">Time Left: {timeLeft}s</div>
      <div className="space-x-4">
        <button
          onClick={handleStart}
          disabled={isRunning || timeLeft > 0}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        >
          Start
        </button>
        <button
          onClick={handlePause}
          disabled={!isRunning || isPaused}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        >
          Pause
        </button>
        <button
          onClick={handleResume}
          disabled={!isPaused || timeLeft <= 0}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        >
          Resume
        </button>
        <button
          onClick={handleReset}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Countdown;
