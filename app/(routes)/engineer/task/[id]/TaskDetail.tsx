"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import Header from "@/components/Header";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  useAtmStore,
  selectGetById as selectAtmById,
} from "@/lib/store/atmStore";
import useTicketStore, {
  selectGetById as selectTicketById,
} from "@/lib/store/ticketStore";

import ArrivalBanner from "@/components/engineer/ArrivalBanner";
import ArrivalMap from "@/components/engineer/ArrivalMap";
import VerificationPanel from "@/components/engineer/VerificationPanel";
import TaskSummaryCard from "@/components/engineer/TaskSummaryCard";
import Checklist from "@/components/engineer/Checklist";
import SupportPanel from "@/components/engineer/SupportPanel";
import useFeedback from "@/lib/utils/useFeedback";
import { toast } from "sonner";
import UploadProof from "../[id]/UploadProof";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { useTransparencyStore } from "@/lib/store/transparencyStore";
import { useAuthStore } from "@/lib/store/authStore";
import MultiStepProgress from "@/components/engineer/MultiStepProgress";
import { CheckCircle, Clock } from "lucide-react";

interface TaskDetailProps {
  ticketId: string;
}

interface Location {
  lat: number;
  lng: number;
}

const TaskDetail: React.FC<TaskDetailProps> = ({ ticketId }) => {
  const router = useRouter();
  const { user } = useAuthStore();
  const ticket = useTicketStore(selectTicketById(ticketId));
  const atmSelector = ticket?.atmId ? selectAtmById(ticket.atmId) : (() => null);
  const atm = useAtmStore(atmSelector as (state: any) => any);
  const { addLog } = useTransparencyStore();

  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [arrived, setArrived] = useState(false);
  const [verified, setVerified] = useState(false);
  const [repairStarted, setRepairStarted] = useState(false);
  const [repairStartTime, setRepairStartTime] = useState<Date | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const { vibrate, playArrivalSound } = useFeedback();
  const [activeStep, setActiveStep] = useState(0);
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [branchConfirmed, setBranchConfirmed] = useState(false);
  const simulationIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [isSimulatingArrival, setIsSimulatingArrival] = useState(false);
  const [simulationProgress, setSimulationProgress] = useState(0);
  const [checklist, setChecklist] = useState([
    { id: "validate", label: "Arrival at ATM location", done: false },
    { id: "verify", label: "On-site Verification", done: false },
    { id: "repair", label: "Perform repair", done: false },
    { id: "proof", label: "Upload proof photo", done: false },
    { id: "complete", label: "Mark complete", done: false },
  ]);

  // Generate verification code when task is loaded
  useEffect(() => {
    if (ticket && !verificationCode) {
      const ticketNum = parseInt(ticket.id.replace("TKT-", "")) || 0;
      const code = String(Math.floor(100000 + (ticketNum % 900000))).padStart(6, "0");
      setVerificationCode(code);
    }
  }, [ticket, verificationCode]);

  // Update active step based on progress
useEffect(() => {
  // RESOLVED ticket → always the final step
  if (ticket?.status === "RESOLVED") {
    setActiveStep(4);
    return;
  }

  let step = 0;
  if (!arrived) step = 0;
  else if (arrived && !verified) step = 1;
  else if (verified && !repairStarted) step = 2;
  else if (repairStarted && !ticket?.resolution?.proofPhotoUrl) step = 2;
  // else if (ticket?.resolution?.proofPhotoUrl && ticket?.status !== "RESOLVED") step = 3;
  // any other case (proof uploaded but not yet RESOLVED) → step 3
  else step = 3;

  setActiveStep(step);
}, [arrived, verified, repairStarted, ticket]);

  // Restore arrival state from ticket data
  useEffect(() => {
    if (
      ticket?.geoValidation?.validatedAt &&
      !arrived &&
      ticket.geoValidation.engineerLat !== undefined &&
      ticket.geoValidation.engineerLng !== undefined
    ) {
      const fallbackLocation = atm?.location.coordinates;
      const lat = ticket.geoValidation.engineerLat ?? fallbackLocation?.lat ?? 0;
      const lng = ticket.geoValidation.engineerLng ?? fallbackLocation?.lng ?? 0;
      
      setArrived(true);
      setUserLocation({ lat, lng });
      setSimulationProgress(100);
      setIsSimulatingArrival(false);
      setChecklist((prev) =>
        prev.map((c) => (c.id === "validate" ? { ...c, done: true } : c))
      );
    }
  }, [ticket?.geoValidation, arrived, atm]);

  useEffect(() => {
  if (ticket?.status === "RESOLVED") {
    // Ensure every flag is true so the step-logic can only land on step 4
    setArrived(true);
    setVerified(true);
    setRepairStarted(true);
    setBranchConfirmed(true);
    setChecklist((prev) =>
      prev.map((c) => ({ ...c, done: true }))
    );
  }
}, [ticket?.status]);

  // Load ticket and ATM data
  useEffect(() => {
    let mounted = true;
    
    async function load() {
      try {
        await Promise.all([
          useTicketStore.getState().refresh(),
          useAtmStore.getState().refresh(),
        ]);
        
        if (mounted) {
          addLog({
            type: "system-event",
            details: `Loaded task detail for Ticket #${ticketId}`,
            severity: "info",
          });
        }
      } catch (error) {
        if (mounted) {
          console.error("Failed to load task data:", error);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }
    
    load();

    return () => {
      mounted = false;
    };
  }, [ticketId, addLog]);

  // Simulate arrival animation
  const confirmArrival = useCallback(
    (location?: Location) => {
      if (arrived || !atm || !ticket) return;

      const fallbackLocation = atm.location.coordinates;
      const finalLocation = location ?? userLocation ?? fallbackLocation ?? null;

      if (!finalLocation) return;

      if (simulationIntervalRef.current) {
        clearInterval(simulationIntervalRef.current);
        simulationIntervalRef.current = null;
      }

      setArrived(true);
      setIsSimulatingArrival(false);
      setSimulationProgress(100);
      setUserLocation(finalLocation);
      setChecklist((prev) =>
        prev.map((c) => (c.id === "validate" ? { ...c, done: true } : c))
      );

      useTicketStore.getState().updateTicket(ticket.id, {
        geoValidation: {
          engineerLat: finalLocation.lat,
          engineerLng: finalLocation.lng,
          validatedAt: new Date().toISOString(),
        },
      });

      addLog({
        type: "user-action",
        details: `Engineer arrived at ATM #${atm.id} (simulated route)`,
        severity: "info",
        user: { role: "engineer", id: user?.id },
      });

      playArrivalSound();
      toast.success("Arrival confirmed! Waiting for branch verification...");
    },
    [arrived, atm, ticket, userLocation, addLog, user?.id, playArrivalSound, toast]
  );

  const handleSkipSimulation = useCallback(() => {
    if (!atm || arrived) return;

    const end = atm.location.coordinates;
    if (!end) return;

    if (simulationIntervalRef.current) {
      clearInterval(simulationIntervalRef.current);
      simulationIntervalRef.current = null;
    }

    setIsSimulatingArrival(false);
    setSimulationProgress(100);
    setUserLocation(end);
    confirmArrival({ lat: end.lat, lng: end.lng });
  }, [atm, arrived, confirmArrival]);

  // Simulate arrival animation when task starts
  useEffect(() => {
    if (!atm || arrived || isSimulatingArrival) return;

    const end = atm.location.coordinates;
    if (!end) return;

    setIsSimulatingArrival(true);
    setSimulationProgress(0);

    const start: Location = {
      lat: end.lat + 0.02,
      lng: end.lng - 0.02,
    };

    setUserLocation(start);

    const totalSteps = 40;
    const stepDuration = 100;
    let currentStep = 0;

    simulationIntervalRef.current = setInterval(() => {
      currentStep += 1;
      const t = Math.min(currentStep / totalSteps, 1);
      const nextLat = start.lat + (end.lat - start.lat) * t;
      const nextLng = start.lng + (end.lng - start.lng) * t;

      setUserLocation({ lat: nextLat, lng: nextLng });
      setSimulationProgress(Math.round(t * 100));

      if (t >= 1) {
        if (simulationIntervalRef.current) {
          clearInterval(simulationIntervalRef.current);
          simulationIntervalRef.current = null;
        }
        setIsSimulatingArrival(false);
        confirmArrival({ lat: end.lat, lng: end.lng });
      }
    }, stepDuration);

    return () => {
      if (simulationIntervalRef.current) {
        clearInterval(simulationIntervalRef.current);
        simulationIntervalRef.current = null;
      }
    };
  }, [atm, arrived, isSimulatingArrival, confirmArrival]);

  // Check if branch has verified
  useEffect(() => {
    if (arrived && ticket?.status === "IN_PROGRESS" && !verified) {
      setVerified(true);
      setRepairStarted(true);
      setRepairStartTime(new Date());
      setChecklist((prev) =>
        prev.map((c) => (c.id === "verify" ? { ...c, done: true } : c))
      );

      addLog({
        type: "user-action",
        details: `Branch verified engineer for Ticket #${ticket.id}`,
        severity: "info",
        user: { role: "engineer", id: user?.id },
      });

      vibrate();
      toast.success("Verification successful! You can now proceed with repairs.");
    }
  }, [arrived, ticket?.status, ticket?.id, verified, user?.id, vibrate, addLog, toast]);

  const handleProofUpload = async (base64: string) => {
    if (!ticket || !repairStartTime) return;
    
    setActionLoading(true);
    try {
      const timeSpent = Math.floor(
        (new Date().getTime() - repairStartTime.getTime()) / 60000
      );

      useTicketStore.getState().updateTicket(ticket.id, {
        resolution: {
          ...(ticket.resolution || {}),
          proofPhotoUrl: base64,
          summary: ticket.resolution?.summary ?? "Proof uploaded",
          resolvedAt: ticket.resolution?.resolvedAt ?? new Date().toISOString(),
          timeSpentMinutes: timeSpent,
        },
      });

      localStorage.setItem(`ticket-proof-${ticket.id}`, base64);
      
      setChecklist((prev) =>
        prev.map((c) => (c.id === "proof" ? { ...c, done: true } : c))
      );

      toast.success("Proof uploaded. Waiting for branch confirmation...");
      
      addLog({
        type: "user-action",
        details: `Proof photo uploaded for Ticket #${ticket.id}`,
        severity: "info",
        user: { role: "engineer", id: user?.id },
        meta: { proofLength: base64.length },
      });
    } catch (error) {
      console.error("Proof upload failed:", error);
      toast.error("Failed to upload proof.");
      
      addLog({
        type: "error",
        details: `Failed to upload proof for Ticket #${ticket.id}`,
        severity: "error",
        user: { role: "engineer", id: user?.id },
      });
    } finally {
      setActionLoading(false);
    }
  };

  // Check if branch has confirmed work
  useEffect(() => {
    if (ticket?.status === "RESOLVED" && !branchConfirmed) {
      setBranchConfirmed(true);
      toast.success("Branch has confirmed work completion!");
    }
  }, [ticket?.status, branchConfirmed]);

  const handleMarkComplete = async () => {
    if (!ticket || !repairStartTime) return;

    const proofUrl =
      ticket.resolution?.proofPhotoUrl ??
      localStorage.getItem(`ticket-proof-${ticket.id}`);

    if (!proofUrl) {
      toast.error("Please upload proof before completing the task.");
      addLog({
        type: "error",
        details: `Upload of proof of fix failed for ticket ${ticket.id}`,
        severity: "error",
      });
      return;
    }

    if (!branchConfirmed) {
      toast.error("Please wait for branch confirmation before completing.");
      return;
    }

    setActionLoading(true);
    try {
      const timeSpent = Math.floor(
        (new Date().getTime() - repairStartTime.getTime()) / 60000
      );

      useTicketStore.getState().updateTicket(ticket.id, {
        resolution: {
          ...(ticket.resolution || {}),
          summary: "Issue resolved successfully",
          resolvedAt: new Date().toISOString(),
          timeSpentMinutes: timeSpent,
          proofPhotoUrl: proofUrl,
        },
      });

      setChecklist((prev) =>
        prev.map((c) => (c.id === "complete" ? { ...c, done: true } : c))
      );

      addLog({
        type: "user-action",
        details: `Engineer completed Ticket #${ticket.id}. Total time: ${timeSpent} minutes`,
        severity: "info",
        user: { role: "engineer", id: user?.id },
      });

      toast.success("Task completed!");
    } catch (error) {
      console.error("Mark complete failed:", error);
      toast.error("Failed to mark complete.");
      
      addLog({
        type: "error",
        details: `Failed to mark Ticket #${ticket.id} as complete.`,
        severity: "error",
        user: { role: "engineer", id: user?.id },
      });
    } finally {
      setActionLoading(false);
    }
  };

  const steps = [
    "Arrival",
    "Verification",
    "Repair",
    "Proof Upload",
    "Completion",
  ];

  if (loading) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center text-gray-500 gap-6">
        <motion.div
          className="flex flex-col gap-6"
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.3 } },
          }}
        >
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="min-w-[300px] h-56 flex flex-col gap-4"
            >
              <Skeleton className="h-24 w-full animate-pulse" />
              <div className="flex items-start gap-3">
                <Skeleton className="h-8 w-8 rounded-full animate-pulse" />
                <div className="flex flex-col gap-2 flex-1">
                  <Skeleton className="h-6 w-full animate-pulse" />
                  <Skeleton className="h-3 w-full animate-pulse" />
                  <Skeleton className="h-3 w-full animate-pulse" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </main>
    );
  }

  if (!ticket || !atm) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center text-center text-red-500">
        <div className="max-w-lg p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-semibold text-red-600">
            Task Not Found
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            It seems the task you&apos;re looking for doesn&apos;t exist or has
            been removed.
          </p>
          <div className="mt-6">
            <button
              onClick={() => router.back()}
              className="px-6 py-2 bg-zenith-accent-600 text-white rounded-lg hover:bg-zenith-accent-500 transition"
            >
              Go Back
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zenith-neutral-50 to-zenith-accent-50">
      <Header title={`Task #${ticket.id}`} subtitle="Engineer Workflow" />
      <MultiStepProgress steps={steps} activeStep={activeStep} />
      
      <main className="flex flex-col md:flex-row gap-6 items-center md:items-start max-w-6xl mx-auto px-4 py-6">
        <div className="flex-1 w-full">
          <AnimatePresence mode="wait">
            {!arrived && (
              <motion.div
                key="map"
                initial={{ opacity: 0, y: 80 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -80 }}
                transition={{ duration: 0.6 }}
                className="w-full"
              >
                <ArrivalBanner arrived={arrived} distance={distance} />
                {atm && userLocation && (
                  <div className="mt-4">
                    <ArrivalMap
                      userLocation={userLocation}
                      atmLocation={atm.location.coordinates}
                      onDistanceUpdate={setDistance}
                      disableTracking
                    />
                  </div>
                )}
                {!arrived && isSimulatingArrival && (
                  <div className="mt-4 space-y-3">
                    <div className="bg-white/70 backdrop-blur-sm border border-zenith-accent-100 rounded-lg p-4 shadow-inner">
                      <p className="text-sm font-semibold text-zenith-accent-700">
                        Navigating to ATM...
                      </p>
                      <p className="text-xs text-zenith-neutral-500 mt-1">
                        Simulating engineer approach for demo purposes.
                      </p>
                      <div className="h-2 w-full bg-zenith-neutral-200 rounded-full overflow-hidden mt-3">
                        <div
                          className="h-full bg-zenith-accent-500 transition-all duration-100"
                          style={{ width: `${simulationProgress}%` }}
                        />
                      </div>
                      <p className="text-xs text-zenith-neutral-500 mt-2 text-right">
                        {simulationProgress}%
                      </p>
                    </div>
                    <button
                      onClick={handleSkipSimulation}
                      className="text-xs text-zenith-neutral-500 hover:text-zenith-accent-600 underline transition"
                    >
                      Skip simulation (dev)
                    </button>
                  </div>
                )}
              </motion.div>
            )}

            {arrived && !verified && (
              <motion.div
                key="verify"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="w-full"
              >
                <div className="bg-white rounded-lg shadow-lg border border-zenith-neutral-200 p-6">
                  <VerificationPanel
                    code={verificationCode}
                    onVerified={() => {}}
                  />
                  <div className="mt-4 p-4 bg-zenith-accent-50 rounded-lg border border-zenith-accent-200">
                    <p className="text-sm text-zenith-accent-700 font-medium">
                      Waiting for branch staff to verify your code...
                    </p>
                    <p className="text-xs text-zenith-accent-600 mt-1">
                      Share code <strong>{verificationCode}</strong> with branch staff. They will verify it matches their system.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {verified && ticket?.status !== "RESOLVED" && (
              <motion.div
                key="details"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full space-y-4"
              >
                {repairStarted && repairStartTime && (
                  <div className="bg-white rounded-lg shadow-lg border border-zenith-accent-200 p-4">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-zenith-accent-600" />
                      <div>
                        <p className="text-sm text-zenith-neutral-500">
                          Repair Time
                        </p>
                        <p className="text-lg font-semibold text-zenith-accent-700">
                          {Math.floor(
                            (new Date().getTime() - repairStartTime.getTime()) / 60000
                          )}{" "}
                          minutes
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <Checklist checklist={checklist} setChecklist={setChecklist} />
                <UploadProof onSuccess={handleProofUpload} />
                
                {ticket.resolution?.proofPhotoUrl && (
                  <section className="bg-white rounded-lg shadow-lg border border-zenith-neutral-200 p-4">
                    <h3 className="text-lg font-semibold mb-2">Uploaded Proof</h3>
                    <div className="mt-2">
                      <Image
                        src={ticket.resolution.proofPhotoUrl}
                        alt="Proof Photo"
                        width={400}
                        height={300}
                        className="rounded border w-full max-w-md"
                      />
                    </div>
                    
                    {!branchConfirmed && (
                      <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                        <p className="text-sm text-yellow-700 font-medium">
                          Waiting for branch confirmation...
                        </p>
                        <p className="text-xs text-yellow-600 mt-1">
                          Branch staff must review and confirm the work before you can complete the task.
                        </p>
                      </div>
                    )}
                    
                    {branchConfirmed && (
                      <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-green-700 font-medium">
                            Branch confirmed work completion
                          </p>
                          <p className="text-xs text-green-600 mt-1">
                            You can now mark the task as complete.
                          </p>
                        </div>
                      </div>
                    )}
                  </section>
                )}

                {ticket.resolution?.proofPhotoUrl && branchConfirmed && (
                  <button
                    onClick={handleMarkComplete}
                    disabled={actionLoading}
                    className="w-full px-6 py-3 bg-gradient-to-r from-zenith-accent-500 to-zenith-accent-600 text-white rounded-lg hover:from-zenith-accent-600 hover:to-zenith-accent-700 transition-all font-medium shadow-lg disabled:opacity-60"
                  >
                    {actionLoading ? "Completing..." : "Mark Task Complete"}
                  </button>
                )}
                
                <SupportPanel />
              </motion.div>
            )}

            {ticket?.status === "RESOLVED" && (
              <motion.div
                key="completion"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full bg-white rounded-lg shadow-lg border border-zenith-neutral-200 p-8 text-center"
              >
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-zenith-neutral-900 mb-2">
                  Task Completed!
                </h2>
                <p className="text-zenith-neutral-600 mb-6">
                  Great work! The task has been successfully completed.
                </p>
                {repairStartTime && ticket.resolution && (
                  <div className="mb-6 p-4 bg-zenith-accent-50 rounded-lg">
                    <p className="text-sm text-zenith-neutral-600">
                      Total repair time: {ticket.resolution.timeSpentMinutes}{" "}
                      minutes
                    </p>
                  </div>
                )}
                <button
                  onClick={() => router.push("/engineer")}
                  className="px-6 py-3 bg-gradient-to-r from-zenith-accent-500 to-zenith-accent-600 text-white rounded-lg hover:from-zenith-accent-600 hover:to-zenith-accent-700 transition-all font-medium"
                >
                  Return to Dashboard
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <TaskSummaryCard ticket={ticket} atm={atm} />
      </main>
    </div>
  );
};

export default TaskDetail;