import { useState, useEffect } from "react";

interface DurationProps {
  urls: string[];
}

export default function Duration({ urls }: DurationProps) {
  const [durations, setDurations] = useState<number[]>([]);

  useEffect(() => {
    const newDurations: number[] = [];
    urls.forEach((url) => {
      const audio = new Audio(url);
      audio.addEventListener("loadedmetadata", () => {
        newDurations.push(audio.duration);
        if (urls.length === newDurations.length) setDurations(newDurations);
      });
    });
  }, [urls]);

  const totalSeconds = Math.round(durations.reduce((a, b) => a + b, 0));

  const durationSeconds = totalSeconds % 60;
  const durationMinutes = ((totalSeconds - durationSeconds) / 60) % 60;
  const durationHours =
    ((totalSeconds - durationSeconds) / 60 - durationMinutes) / 60;

  return (
    <>
      {durationHours} h {durationMinutes} min
    </>
  );
}
