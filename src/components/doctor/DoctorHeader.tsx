import { motion } from "framer-motion";
import { Activity, Stethoscope, Bell, Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface DoctorHeaderProps {
  doctorName: string;
  onMenuClick?: () => void;
}

export function DoctorHeader({ doctorName, onMenuClick }: DoctorHeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-40 glass border-b border-border"
    >
      <div className="flex items-center justify-between px-4 py-3 lg:px-6">
        <div className="flex items-center gap-3">
          <button onClick={onMenuClick} className="lg:hidden p-2 rounded-xl hover:bg-muted">
            <Menu className="h-5 w-5 text-foreground" />
          </button>
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
              <Stethoscope className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="hidden sm:block">
              <p className="text-xs text-muted-foreground">Doctor Dashboard</p>
              <h1 className="text-sm font-bold text-foreground">Dr. {doctorName}</h1>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link to="/">
            <Button variant="ghost" size="sm" className="text-xs gap-1.5">
              <Activity className="h-4 w-4" />
              <span className="hidden sm:inline">Patient App</span>
            </Button>
          </Link>
          <button className="relative p-2.5 rounded-xl hover:bg-muted transition-colors">
            <Bell className="h-5 w-5 text-muted-foreground" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-destructive" />
          </button>
        </div>
      </div>
    </motion.header>
  );
}
