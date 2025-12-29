import { motion } from "framer-motion";
import { Users, AlertTriangle, Activity, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardsProps {
  totalPatients: number;
  alertCount: number;
  avgHeartRate: number;
  lastUpdate: string;
}

export function StatsCards({ totalPatients, alertCount, avgHeartRate, lastUpdate }: StatsCardsProps) {
  const stats = [
    {
      label: "Total Patients",
      value: totalPatients,
      icon: Users,
      color: "bg-primary/10 text-primary",
    },
    {
      label: "Active Alerts",
      value: alertCount,
      icon: AlertTriangle,
      color: alertCount > 0 ? "bg-destructive/10 text-destructive" : "bg-success/10 text-success",
    },
    {
      label: "Avg Heart Rate",
      value: `${avgHeartRate} bpm`,
      icon: Activity,
      color: "bg-heart/10 text-heart",
    },
    {
      label: "Last Update",
      value: lastUpdate,
      icon: Clock,
      color: "bg-muted text-muted-foreground",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="rounded-xl bg-card border border-border p-4 shadow-sm"
        >
          <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center mb-3", stat.color)}>
            <stat.icon className="h-5 w-5" />
          </div>
          <p className="text-xs text-muted-foreground">{stat.label}</p>
          <p className="text-xl font-bold text-foreground mt-0.5">{stat.value}</p>
        </motion.div>
      ))}
    </div>
  );
}
