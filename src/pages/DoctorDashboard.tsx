import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, SortAsc } from "lucide-react";
import { DoctorHeader } from "@/components/doctor/DoctorHeader";
import { StatsCards } from "@/components/doctor/StatsCards";
import { PatientCard, Patient } from "@/components/doctor/PatientCard";
import { PatientDetailModal } from "@/components/doctor/PatientDetailModal";
import { Button } from "@/components/ui/button";

// Mock patient data
const mockPatients: Patient[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    age: 34,
    location: "Rural District A",
    lastSync: "2 min ago",
    hasAlert: false,
    vitals: {
      heartRate: 72,
      heartRateStatus: "normal",
      heartRateTrend: "stable",
      breathRate: 16,
      breathRateStatus: "normal",
      breathRateTrend: "stable",
      stressLevel: 4,
      stressStatus: "normal",
      stressTrend: "down",
    },
  },
  {
    id: "2",
    name: "Michael Chen",
    age: 56,
    location: "Remote Village B",
    lastSync: "5 min ago",
    hasAlert: true,
    vitals: {
      heartRate: 98,
      heartRateStatus: "warning",
      heartRateTrend: "up",
      breathRate: 22,
      breathRateStatus: "warning",
      breathRateTrend: "up",
      stressLevel: 7,
      stressStatus: "warning",
      stressTrend: "up",
    },
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    age: 45,
    location: "Mountain Area C",
    lastSync: "10 min ago",
    hasAlert: false,
    vitals: {
      heartRate: 68,
      heartRateStatus: "normal",
      heartRateTrend: "down",
      breathRate: 14,
      breathRateStatus: "normal",
      breathRateTrend: "stable",
      stressLevel: 3,
      stressStatus: "normal",
      stressTrend: "down",
    },
  },
  {
    id: "4",
    name: "James Williams",
    age: 62,
    location: "Coastal Town D",
    lastSync: "15 min ago",
    hasAlert: true,
    vitals: {
      heartRate: 105,
      heartRateStatus: "critical",
      heartRateTrend: "up",
      breathRate: 24,
      breathRateStatus: "critical",
      breathRateTrend: "up",
      stressLevel: 9,
      stressStatus: "critical",
      stressTrend: "up",
    },
  },
  {
    id: "5",
    name: "Maria Garcia",
    age: 28,
    location: "Valley Region E",
    lastSync: "20 min ago",
    hasAlert: false,
    vitals: {
      heartRate: 75,
      heartRateStatus: "normal",
      heartRateTrend: "stable",
      breathRate: 15,
      breathRateStatus: "normal",
      breathRateTrend: "stable",
      stressLevel: 5,
      stressStatus: "normal",
      stressTrend: "stable",
    },
  },
  {
    id: "6",
    name: "Robert Brown",
    age: 71,
    location: "Highland Area F",
    lastSync: "25 min ago",
    hasAlert: false,
    vitals: {
      heartRate: 70,
      heartRateStatus: "normal",
      heartRateTrend: "stable",
      breathRate: 17,
      breathRateStatus: "normal",
      breathRateTrend: "stable",
      stressLevel: 4,
      stressStatus: "normal",
      stressTrend: "down",
    },
  },
];

const DoctorDashboard = () => {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterAlerts, setFilterAlerts] = useState(false);

  const filteredPatients = mockPatients.filter((patient) => {
    const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = !filterAlerts || patient.hasAlert;
    return matchesSearch && matchesFilter;
  });

  const alertCount = mockPatients.filter((p) => p.hasAlert).length;
  const avgHeartRate = Math.round(
    mockPatients.reduce((acc, p) => acc + p.vitals.heartRate, 0) / mockPatients.length
  );

  return (
    <div className="min-h-screen pb-8">
      <DoctorHeader doctorName="Emma Wilson" />

      <main className="max-w-6xl mx-auto px-4 lg:px-6 py-6 space-y-6">
        {/* Stats */}
        <StatsCards
          totalPatients={mockPatients.length}
          alertCount={alertCount}
          avgHeartRate={avgHeartRate}
          lastUpdate="Just now"
        />

        {/* Search and filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search patients by name or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 pl-11 pr-4 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={filterAlerts ? "default" : "outline"}
              size="default"
              onClick={() => setFilterAlerts(!filterAlerts)}
              className="gap-2"
            >
              <Filter className="h-4 w-4" />
              Alerts Only
              {alertCount > 0 && (
                <span className="ml-1 px-1.5 py-0.5 rounded-full bg-destructive/20 text-destructive text-xs font-bold">
                  {alertCount}
                </span>
              )}
            </Button>
            <Button variant="outline" size="icon">
              <SortAsc className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>

        {/* Patient grid */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-lg font-bold text-foreground mb-4">
            Patients ({filteredPatients.length})
          </h2>
          
          {filteredPatients.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredPatients.map((patient, index) => (
                <PatientCard
                  key={patient.id}
                  patient={patient}
                  index={index}
                  onClick={() => setSelectedPatient(patient)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <p>No patients found matching your criteria.</p>
            </div>
          )}
        </motion.section>
      </main>

      {/* Patient detail modal */}
      <PatientDetailModal
        patient={selectedPatient}
        isOpen={!!selectedPatient}
        onClose={() => setSelectedPatient(null)}
      />
    </div>
  );
};

export default DoctorDashboard;
