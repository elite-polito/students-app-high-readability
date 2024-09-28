import { useEffect, useState } from 'react';

export const useActivityTimer = () => {

  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  const stopTimer = () => setIsRunning(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((time) => time + 50);
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  return { time, stopTimer};
}