import { motion } from "framer-motion";
import { Bell, Settings, Activity, Stethoscope } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  userName: string;
}

export function Header({ userName }: HeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-between px-5 py-4"
    >
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-glow">
          <Activity className="h-6 w-6 text-primary-foreground" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Good morning</p>
          <h1 className="text-lg font-bold text-foreground">{userName}</h1>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Link to="/doctor">
          <Button variant="ghost" size="sm" className="text-xs gap-1.5">
            <Stethoscope className="h-4 w-4" />
            <span className="hidden sm:inline">Doctor</span>
          </Button>
        </Link>
        <button className="relative p-2.5 rounded-xl hover:bg-muted transition-colors">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-destructive" />
        </button>
        <button className="p-2.5 rounded-xl hover:bg-muted transition-colors">
          <Settings className="h-5 w-5 text-muted-foreground" />
        </button>
      </div>
    </motion.header>
  );
}
