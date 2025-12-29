import { motion } from "framer-motion";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { cn } from "@/lib/utils";

interface VitalsChartProps {
  data: { time: string; value: number }[];
  color: "heart" | "breath" | "stress";
  label: string;
}

const colorConfig = {
  heart: {
    stroke: "hsl(350, 80%, 55%)",
    fill: "hsl(350, 80%, 55%)",
  },
  breath: {
    stroke: "hsl(200, 80%, 55%)",
    fill: "hsl(200, 80%, 55%)",
  },
  stress: {
    stroke: "hsl(168, 80%, 38%)",
    fill: "hsl(168, 80%, 38%)",
  },
};

export function VitalsChart({ data, color, label }: VitalsChartProps) {
  const config = colorConfig[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl bg-card border border-border p-5 shadow-sm"
    >
      <h3 className="text-sm font-semibold text-foreground mb-4">{label}</h3>
      
      <div className="h-32">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={config.fill} stopOpacity={0.3} />
                <stop offset="100%" stopColor={config.fill} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
            />
            <Tooltip
              contentStyle={{
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "12px",
                fontSize: "12px",
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke={config.stroke}
              strokeWidth={2}
              fill={`url(#gradient-${color})`}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
