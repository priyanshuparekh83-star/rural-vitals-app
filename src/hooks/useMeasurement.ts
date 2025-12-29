import { useState, useCallback } from "react";

type MeasurementType = "heart" | "breath" | "stress";
type MeasurementStatus = "idle" | "measuring" | "complete";

interface MeasurementState {
  type: MeasurementType | null;
  status: MeasurementStatus;
  progress: number;
  value: number | null;
}

const measurementRanges = {
  heart: { min: 60, max: 100 },
  breath: { min: 12, max: 20 },
  stress: { min: 1, max: 10 },
};

export function useMeasurement() {
  const [state, setState] = useState<MeasurementState>({
    type: null,
    status: "idle",
    progress: 0,
    value: null,
  });

  const startMeasurement = useCallback((type: MeasurementType) => {
    setState({
      type,
      status: "measuring",
      progress: 0,
      value: null,
    });

    // Simulate measurement progress
    const duration = type === "heart" ? 8000 : type === "breath" ? 10000 : 6000;
    const interval = 100;
    let elapsed = 0;

    const timer = setInterval(() => {
      elapsed += interval;
      const progress = Math.min((elapsed / duration) * 100, 100);

      if (progress >= 100) {
        clearInterval(timer);
        const range = measurementRanges[type];
        const value = Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
        
        setState({
          type,
          status: "complete",
          progress: 100,
          value,
        });
      } else {
        setState((prev) => ({
          ...prev,
          progress,
        }));
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const reset = useCallback(() => {
    setState({
      type: null,
      status: "idle",
      progress: 0,
      value: null,
    });
  }, []);

  return {
    ...state,
    startMeasurement,
    reset,
  };
}
