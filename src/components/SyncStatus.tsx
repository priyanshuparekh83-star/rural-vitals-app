import { motion } from "framer-motion";
import { Cloud, CloudOff, RefreshCw, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface SyncStatusProps {
  isConnected: boolean;
  lastSync: string | null;
  doctorName?: string;
  onSync: () => void;
  isSyncing: boolean;
}

export function SyncStatus({
  isConnected,
  lastSync,
  doctorName,
  onSync,
  isSyncing,
}: SyncStatusProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl bg-card border border-border p-5 shadow-sm"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-foreground">Sync Status</h3>
        <button
          onClick={onSync}
          disabled={isSyncing}
          className={cn(
            "p-2 rounded-xl hover:bg-muted transition-colors",
            isSyncing && "animate-spin"
          )}
        >
          <RefreshCw className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>

      <div className="space-y-4">
        {/* Connection status */}
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "h-10 w-10 rounded-xl flex items-center justify-center",
              isConnected ? "bg-success/10" : "bg-destructive/10"
            )}
          >
            {isConnected ? (
              <Cloud className="h-5 w-5 text-success" />
            ) : (
              <CloudOff className="h-5 w-5 text-destructive" />
            )}
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">
              {isConnected ? "Connected to Google Fit" : "Not connected"}
            </p>
            <p className="text-xs text-muted-foreground">
              {lastSync ? `Last sync: ${lastSync}` : "Never synced"}
            </p>
          </div>
        </div>

        {/* Doctor info */}
        {doctorName && (
          <div className="flex items-center gap-3 pt-3 border-t border-border">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                Dr. {doctorName}
              </p>
              <p className="text-xs text-muted-foreground">
                Viewing your vitals
              </p>
            </div>
            <div className="ml-auto flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
              <span className="text-xs text-success font-medium">Active</span>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
