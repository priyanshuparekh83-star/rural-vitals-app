import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface PatientVitalBadgeProps {
  label: string;
  value: number | string;
  unit: string;
  trend?: "up" | "down" | "stable";
  status: "normal" | "warning" | "critical";
}

export function PatientVitalBadge({
  label,
  value,
  unit,
  trend = "stable",
  status,
}: PatientVitalBadgeProps) {
  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;

  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-xs text-muted-foreground">{label}</span>
      <div className="flex items-center gap-1">
        <span
          className={cn(
            "text-lg font-bold",
            status === "normal" && "text-foreground",
            status === "warning" && "text-warning",
            status === "critical" && "text-destructive"
          )}
        >
          {value}
        </span>
        <span className="text-xs text-muted-foreground">{unit}</span>
      </div>
      <TrendIcon
        className={cn(
          "h-3 w-3",
          trend === "up" && "text-destructive",
          trend === "down" && "text-success",
          trend === "stable" && "text-muted-foreground"
        )}
      />
    </div>
  );
}
