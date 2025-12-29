import { motion } from "framer-motion";
import { Heart, Wind, Brain, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QuickActionsProps {
  onMeasure: (type: "heart" | "breath" | "stress") => void;
}

export function QuickActions({ onMeasure }: QuickActionsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="px-5"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-foreground">Quick Measure</h2>
        <Zap className="h-5 w-5 text-primary" />
      </div>
      
      <div className="grid grid-cols-3 gap-3">
        <Button
          variant="vital"
          className="flex-col h-auto py-4 gap-2"
          onClick={() => onMeasure("heart")}
        >
          <div className="h-10 w-10 rounded-xl bg-gradient-heart flex items-center justify-center shadow-heart">
            <Heart className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xs font-medium">Heart Rate</span>
        </Button>

        <Button
          variant="vital"
          className="flex-col h-auto py-4 gap-2"
          onClick={() => onMeasure("breath")}
        >
          <div className="h-10 w-10 rounded-xl bg-gradient-breath flex items-center justify-center shadow-breath">
            <Wind className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xs font-medium">Breathing</span>
        </Button>

        <Button
          variant="vital"
          className="flex-col h-auto py-4 gap-2"
          onClick={() => onMeasure("stress")}
        >
          <div className="h-10 w-10 rounded-xl bg-gradient-stress flex items-center justify-center shadow-glow">
            <Brain className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xs font-medium">Stress</span>
        </Button>
      </div>
    </motion.div>
  );
}
