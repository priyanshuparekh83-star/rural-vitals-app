import { motion } from "framer-motion";
import { User, MapPin, Clock, AlertTriangle, ChevronRight } from "lucide-react";
import { PatientVitalBadge } from "./PatientVitalBadge";
import { cn } from "@/lib/utils";

export interface Patient {
  id: string;
  name: string;
  age: number;
  location: string;
  lastSync: string;
  avatar?: string;
  vitals: {
    heartRate: number;
    heartRateStatus: "normal" | "warning" | "critical";
    heartRateTrend: "up" | "down" | "stable";
    breathRate: number;
    breathRateStatus: "normal" | "warning" | "critical";
    breathRateTrend: "up" | "down" | "stable";
    stressLevel: number;
    stressStatus: "normal" | "warning" | "critical";
    stressTrend: "up" | "down" | "stable";
  };
  hasAlert: boolean;
}

interface PatientCardProps {
  patient: Patient;
  onClick: () => void;
  index: number;
}

export function PatientCard({ patient, onClick, index }: PatientCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      className={cn(
        "relative rounded-2xl bg-card border border-border p-4 cursor-pointer",
        "shadow-sm hover:shadow-md transition-all duration-300",
        patient.hasAlert && "border-destructive/50 bg-destructive/5"
      )}
    >
      {/* Alert indicator */}
      {patient.hasAlert && (
        <div className="absolute -top-1 -right-1">
          <div className="relative">
            <div className="h-4 w-4 rounded-full bg-destructive animate-pulse" />
            <AlertTriangle className="absolute inset-0 h-4 w-4 text-destructive-foreground p-0.5" />
          </div>
        </div>
      )}

      {/* Patient info header */}
      <div className="flex items-start gap-3 mb-4">
        <div className="h-12 w-12 rounded-xl bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
          {patient.name.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground truncate">{patient.name}</h3>
          <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
            <span>{patient.age} years</span>
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {patient.location}
            </span>
          </div>
        </div>
        <ChevronRight className="h-5 w-5 text-muted-foreground" />
      </div>

      {/* Vitals row */}
      <div className="grid grid-cols-3 gap-2 pt-3 border-t border-border">
        <PatientVitalBadge
          label="Heart"
          value={patient.vitals.heartRate}
          unit="bpm"
          status={patient.vitals.heartRateStatus}
          trend={patient.vitals.heartRateTrend}
        />
        <PatientVitalBadge
          label="Breath"
          value={patient.vitals.breathRate}
          unit="/min"
          status={patient.vitals.breathRateStatus}
          trend={patient.vitals.breathRateTrend}
        />
        <PatientVitalBadge
          label="Stress"
          value={patient.vitals.stressLevel}
          unit="/10"
          status={patient.vitals.stressStatus}
          trend={patient.vitals.stressTrend}
        />
      </div>

      {/* Last sync */}
      <div className="flex items-center gap-1 mt-3 text-xs text-muted-foreground">
        <Clock className="h-3 w-3" />
        <span>Synced {patient.lastSync}</span>
      </div>
    </motion.div>
  );
}
