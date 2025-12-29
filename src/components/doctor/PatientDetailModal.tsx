import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, Wind, Brain, MapPin, Phone, Mail, Calendar, TrendingUp, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VitalsChart } from "@/components/VitalsChart";
import { Patient } from "./PatientCard";
import { cn } from "@/lib/utils";

interface PatientDetailModalProps {
  patient: Patient | null;
  isOpen: boolean;
  onClose: () => void;
}

// Mock detailed data
const heartRateHistory = [
  { time: "6am", value: 68 },
  { time: "9am", value: 75 },
  { time: "12pm", value: 82 },
  { time: "3pm", value: 78 },
  { time: "6pm", value: 71 },
  { time: "9pm", value: 65 },
];

const breathHistory = [
  { time: "6am", value: 14 },
  { time: "9am", value: 16 },
  { time: "12pm", value: 18 },
  { time: "3pm", value: 15 },
  { time: "6pm", value: 14 },
  { time: "9pm", value: 13 },
];

const stressHistory = [
  { time: "6am", value: 3 },
  { time: "9am", value: 5 },
  { time: "12pm", value: 7 },
  { time: "3pm", value: 6 },
  { time: "6pm", value: 4 },
  { time: "9pm", value: 2 },
];

export function PatientDetailModal({ patient, isOpen, onClose }: PatientDetailModalProps) {
  if (!patient) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-foreground/20 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl bg-card rounded-3xl shadow-lg my-8"
          >
            {/* Header */}
            <div className="relative p-6 border-b border-border">
              <button
                onClick={onClose}
                className="absolute right-4 top-4 p-2 rounded-full hover:bg-muted transition-colors"
              >
                <X className="h-5 w-5 text-muted-foreground" />
              </button>

              <div className="flex items-start gap-4">
                <div className="h-16 w-16 rounded-2xl bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold text-2xl shadow-glow">
                  {patient.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">{patient.name}</h2>
                  <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-muted-foreground">
                    <span>{patient.age} years old</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {patient.location}
                    </span>
                  </div>
                  {patient.hasAlert && (
                    <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-destructive/10 text-destructive text-xs font-medium">
                      <span className="h-1.5 w-1.5 rounded-full bg-destructive animate-pulse" />
                      Requires attention
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Current Vitals */}
            <div className="p-6 border-b border-border">
              <h3 className="text-sm font-semibold text-foreground mb-4">Current Vitals</h3>
              <div className="grid grid-cols-3 gap-4">
                <VitalDisplay
                  icon={Heart}
                  label="Heart Rate"
                  value={patient.vitals.heartRate}
                  unit="BPM"
                  status={patient.vitals.heartRateStatus}
                  trend={patient.vitals.heartRateTrend}
                  gradient="heart"
                />
                <VitalDisplay
                  icon={Wind}
                  label="Respiration"
                  value={patient.vitals.breathRate}
                  unit="/min"
                  status={patient.vitals.breathRateStatus}
                  trend={patient.vitals.breathRateTrend}
                  gradient="breath"
                />
                <VitalDisplay
                  icon={Brain}
                  label="Stress"
                  value={patient.vitals.stressLevel}
                  unit="/10"
                  status={patient.vitals.stressStatus}
                  trend={patient.vitals.stressTrend}
                  gradient="stress"
                />
              </div>
            </div>

            {/* Charts */}
            <div className="p-6 space-y-4">
              <h3 className="text-sm font-semibold text-foreground">Today's Trends</h3>
              <VitalsChart data={heartRateHistory} color="heart" label="Heart Rate (BPM)" />
              <VitalsChart data={breathHistory} color="breath" label="Respiration (breaths/min)" />
              <VitalsChart data={stressHistory} color="stress" label="Stress Level" />
            </div>

            {/* Actions */}
            <div className="p-6 pt-0 flex gap-3">
              <Button variant="outline" className="flex-1 gap-2">
                <Phone className="h-4 w-4" />
                Call Patient
              </Button>
              <Button variant="default" className="flex-1 gap-2">
                <Calendar className="h-4 w-4" />
                Schedule Visit
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface VitalDisplayProps {
  icon: React.ElementType;
  label: string;
  value: number;
  unit: string;
  status: "normal" | "warning" | "critical";
  trend: "up" | "down" | "stable";
  gradient: "heart" | "breath" | "stress";
}

function VitalDisplay({ icon: Icon, label, value, unit, status, trend, gradient }: VitalDisplayProps) {
  const gradientClasses = {
    heart: "bg-gradient-heart",
    breath: "bg-gradient-breath",
    stress: "bg-gradient-stress",
  };

  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : null;

  return (
    <div className="rounded-xl bg-muted/50 p-4 text-center">
      <div className={cn("h-10 w-10 rounded-xl mx-auto mb-2 flex items-center justify-center", gradientClasses[gradient])}>
        <Icon className="h-5 w-5 text-primary-foreground" />
      </div>
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <div className="flex items-center justify-center gap-1">
        <span
          className={cn(
            "text-2xl font-bold",
            status === "normal" && "text-foreground",
            status === "warning" && "text-warning",
            status === "critical" && "text-destructive"
          )}
        >
          {value}
        </span>
        <span className="text-xs text-muted-foreground">{unit}</span>
        {TrendIcon && (
          <TrendIcon
            className={cn(
              "h-4 w-4 ml-1",
              trend === "up" && "text-destructive",
              trend === "down" && "text-success"
            )}
          />
        )}
      </div>
    </div>
  );
}
