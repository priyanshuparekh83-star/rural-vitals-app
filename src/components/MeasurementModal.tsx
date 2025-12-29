import { motion, AnimatePresence } from "framer-motion";
import { X, Camera, Mic, Activity, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MeasurementModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "heart" | "breath" | "stress";
  status: "idle" | "measuring" | "complete";
  progress: number;
  value: number | null;
  onStartMeasure: () => void;
}

const measurementConfig = {
  heart: {
    title: "Heart Rate",
    instruction: "Place your finger over the camera lens",
    icon: Camera,
    gradient: "bg-gradient-heart",
    shadow: "shadow-heart",
    unit: "BPM",
  },
  breath: {
    title: "Respiration Rate",
    instruction: "Breathe normally while holding the phone steady",
    icon: Mic,
    gradient: "bg-gradient-breath",
    shadow: "shadow-breath",
    unit: "breaths/min",
  },
  stress: {
    title: "Stress Level",
    instruction: "Stay relaxed and breathe deeply",
    icon: Activity,
    gradient: "bg-gradient-stress",
    shadow: "shadow-glow",
    unit: "level",
  },
};

export function MeasurementModal({
  isOpen,
  onClose,
  type,
  status,
  progress,
  value,
  onStartMeasure,
}: MeasurementModalProps) {
  const config = measurementConfig[type];
  const Icon = config.icon;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-foreground/20 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm bg-card rounded-3xl shadow-lg overflow-hidden"
          >
            {/* Header */}
            <div className="relative p-6 pb-4">
              <button
                onClick={onClose}
                className="absolute right-4 top-4 p-2 rounded-full hover:bg-muted transition-colors"
              >
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
              <h2 className="text-xl font-bold text-foreground">{config.title}</h2>
              <p className="text-sm text-muted-foreground mt-1">{config.instruction}</p>
            </div>

            {/* Measurement Circle */}
            <div className="flex flex-col items-center justify-center py-8 px-6">
              <div className="relative">
                {/* Progress ring */}
                <svg className="w-48 h-48 -rotate-90">
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    fill="none"
                    stroke="hsl(var(--muted))"
                    strokeWidth="8"
                  />
                  <motion.circle
                    cx="96"
                    cy="96"
                    r="88"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={553}
                    initial={{ strokeDashoffset: 553 }}
                    animate={{ strokeDashoffset: 553 - (553 * progress) / 100 }}
                    transition={{ duration: 0.3 }}
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="hsl(var(--primary))" />
                      <stop offset="100%" stopColor="hsl(var(--primary) / 0.6)" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Center content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  {status === "complete" && value !== null ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-center"
                    >
                      <span className="text-5xl font-bold text-foreground">{value}</span>
                      <p className="text-sm text-muted-foreground mt-1">{config.unit}</p>
                    </motion.div>
                  ) : status === "measuring" ? (
                    <div className="relative">
                      <div
                        className={cn(
                          "h-20 w-20 rounded-full flex items-center justify-center",
                          config.gradient,
                          config.shadow,
                          type === "heart" && "animate-heartbeat",
                          type === "breath" && "animate-breathe"
                        )}
                      >
                        <Icon className="h-10 w-10 text-primary-foreground" />
                      </div>
                      {/* Pulse rings */}
                      <div
                        className={cn(
                          "absolute inset-0 rounded-full animate-pulse-ring",
                          config.gradient,
                          "opacity-50"
                        )}
                      />
                    </div>
                  ) : (
                    <div
                      className={cn(
                        "h-20 w-20 rounded-full flex items-center justify-center",
                        "bg-muted"
                      )}
                    >
                      <Icon className="h-10 w-10 text-muted-foreground" />
                    </div>
                  )}
                </div>
              </div>

              {/* Progress text */}
              {status === "measuring" && (
                <p className="mt-4 text-sm text-muted-foreground">
                  Measuring... {Math.round(progress)}%
                </p>
              )}

              {status === "complete" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 mt-4 text-success"
                >
                  <Check className="h-4 w-4" />
                  <span className="text-sm font-medium">Measurement complete</span>
                </motion.div>
              )}
            </div>

            {/* Action button */}
            <div className="p-6 pt-2">
              {status === "idle" ? (
                <Button
                  variant="measure"
                  className="w-full"
                  onClick={onStartMeasure}
                >
                  Start Measurement
                </Button>
              ) : status === "complete" ? (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={onClose}
                >
                  Done
                </Button>
              ) : (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={onClose}
                  disabled
                >
                  Measuring...
                </Button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
