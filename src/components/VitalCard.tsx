import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface VitalCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  unit: string;
  status: "normal" | "warning" | "critical";
  gradient: "heart" | "breath" | "stress";
  onClick?: () => void;
  isAnimating?: boolean;
}

const gradientClasses = {
  heart: "bg-gradient-heart shadow-heart",
  breath: "bg-gradient-breath shadow-breath",
  stress: "bg-gradient-stress shadow-glow",
};

const statusColors = {
  normal: "text-success",
  warning: "text-warning",
  critical: "text-destructive",
};

export function VitalCard({
  icon: Icon,
  label,
  value,
  unit,
  status,
  gradient,
  onClick,
  isAnimating,
}: VitalCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "relative overflow-hidden rounded-2xl bg-card p-5 cursor-pointer",
        "border border-border shadow-md transition-all duration-300",
        "hover:shadow-lg hover:border-primary/20"
      )}
    >
      {/* Icon with gradient background */}
      <div
        className={cn(
          "absolute -right-4 -top-4 h-24 w-24 rounded-full opacity-20 blur-2xl",
          gradientClasses[gradient]
        )}
      />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <div
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-xl",
              gradientClasses[gradient]
            )}
          >
            <Icon className={cn("h-5 w-5 text-primary-foreground", isAnimating && "animate-heartbeat")} />
          </div>
          <span
            className={cn(
              "text-xs font-medium px-2 py-1 rounded-full",
              status === "normal" && "bg-success/10 text-success",
              status === "warning" && "bg-warning/10 text-warning",
              status === "critical" && "bg-destructive/10 text-destructive"
            )}
          >
            {status === "normal" ? "Normal" : status === "warning" ? "Elevated" : "Critical"}
          </span>
        </div>

        <p className="text-sm font-medium text-muted-foreground mb-1">{label}</p>
        
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold text-foreground">{value}</span>
          <span className="text-sm font-medium text-muted-foreground">{unit}</span>
        </div>
      </div>
    </motion.div>
  );
}
