import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Wind, Brain } from "lucide-react";
import { Header } from "@/components/Header";
import { VitalCard } from "@/components/VitalCard";
import { QuickActions } from "@/components/QuickActions";
import { MeasurementModal } from "@/components/MeasurementModal";
import { VitalsChart } from "@/components/VitalsChart";
import { SyncStatus } from "@/components/SyncStatus";
import { useMeasurement } from "@/hooks/useMeasurement";

// Mock data for charts
const heartRateData = [
  { time: "6am", value: 68 },
  { time: "9am", value: 75 },
  { time: "12pm", value: 82 },
  { time: "3pm", value: 78 },
  { time: "6pm", value: 71 },
  { time: "9pm", value: 65 },
];

const breathData = [
  { time: "6am", value: 14 },
  { time: "9am", value: 16 },
  { time: "12pm", value: 18 },
  { time: "3pm", value: 15 },
  { time: "6pm", value: 14 },
  { time: "9pm", value: 13 },
];

const stressData = [
  { time: "6am", value: 3 },
  { time: "9am", value: 5 },
  { time: "12pm", value: 7 },
  { time: "3pm", value: 6 },
  { time: "6pm", value: 4 },
  { time: "9pm", value: 2 },
];

const Index = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"heart" | "breath" | "stress">("heart");
  const [isSyncing, setIsSyncing] = useState(false);
  
  const { status, progress, value, startMeasurement, reset } = useMeasurement();

  // Current vitals state
  const [vitals, setVitals] = useState({
    heartRate: 72,
    breathRate: 16,
    stressLevel: 4,
  });

  const handleOpenMeasure = (type: "heart" | "breath" | "stress") => {
    setModalType(type);
    setModalOpen(true);
    reset();
  };

  const handleStartMeasure = () => {
    startMeasurement(modalType);
  };

  const handleCloseModal = () => {
    if (value !== null) {
      // Update vitals with new measurement
      setVitals((prev) => ({
        ...prev,
        [modalType === "heart" ? "heartRate" : modalType === "breath" ? "breathRate" : "stressLevel"]: value,
      }));
    }
    setModalOpen(false);
    reset();
  };

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 2000);
  };

  const getHeartStatus = () => {
    if (vitals.heartRate < 60 || vitals.heartRate > 100) return "critical";
    if (vitals.heartRate < 65 || vitals.heartRate > 90) return "warning";
    return "normal";
  };

  const getBreathStatus = () => {
    if (vitals.breathRate < 12 || vitals.breathRate > 20) return "critical";
    if (vitals.breathRate < 14 || vitals.breathRate > 18) return "warning";
    return "normal";
  };

  const getStressStatus = () => {
    if (vitals.stressLevel >= 8) return "critical";
    if (vitals.stressLevel >= 5) return "warning";
    return "normal";
  };

  return (
    <div className="min-h-screen pb-8">
      <Header userName="Sarah" />

      <main className="space-y-6">
        {/* Quick Actions */}
        <QuickActions onMeasure={handleOpenMeasure} />

        {/* Current Vitals */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="px-5"
        >
          <h2 className="text-lg font-bold text-foreground mb-4">Current Vitals</h2>
          <div className="grid grid-cols-2 gap-4">
            <VitalCard
              icon={Heart}
              label="Heart Rate"
              value={vitals.heartRate}
              unit="BPM"
              status={getHeartStatus()}
              gradient="heart"
              onClick={() => handleOpenMeasure("heart")}
            />
            <VitalCard
              icon={Wind}
              label="Respiration"
              value={vitals.breathRate}
              unit="/min"
              status={getBreathStatus()}
              gradient="breath"
              onClick={() => handleOpenMeasure("breath")}
            />
          </div>
          
          <div className="mt-4">
            <VitalCard
              icon={Brain}
              label="Stress Level"
              value={vitals.stressLevel}
              unit="/ 10"
              status={getStressStatus()}
              gradient="stress"
              onClick={() => handleOpenMeasure("stress")}
            />
          </div>
        </motion.section>

        {/* Charts */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="px-5 space-y-4"
        >
          <h2 className="text-lg font-bold text-foreground">Today's Trends</h2>
          <VitalsChart data={heartRateData} color="heart" label="Heart Rate (BPM)" />
          <VitalsChart data={breathData} color="breath" label="Respiration (breaths/min)" />
          <VitalsChart data={stressData} color="stress" label="Stress Level" />
        </motion.section>

        {/* Sync Status */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="px-5"
        >
          <SyncStatus
            isConnected={true}
            lastSync="2 minutes ago"
            doctorName="Emma Wilson"
            onSync={handleSync}
            isSyncing={isSyncing}
          />
        </motion.section>
      </main>

      {/* Measurement Modal */}
      <MeasurementModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        type={modalType}
        status={status}
        progress={progress}
        value={value}
        onStartMeasure={handleStartMeasure}
      />
    </div>
  );
};

export default Index;
