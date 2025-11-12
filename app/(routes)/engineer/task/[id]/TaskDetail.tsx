"use client";

import React, { useEffect, useState, useRef } from "react";
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
import VerificationPanel from "@/components/engineer/VerificationPanel";
import TaskSummaryCard from "@/components/engineer/TaskSummaryCard";
import Checklist from "@/components/engineer/Checklist";

import SupportPanel from "@/components/engineer/SupportPanel";

// import TaskMapCard from "@/components/engineer/TaskMapCard";
import useFeedback from "@/lib/utils/useFeedback";
import { toast } from "sonner";
import UploadProof from "../[id]/UploadProof";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { useTransparencyStore } from "@/lib/store/transparencyStore";
import { useAuthStore } from "@/lib/store/authStore";
import MultiStepProgress from "@/components/engineer/MultiStepProgress";
import sendWhatsAppMessage from "@/lib/utils/sendWhatsappMessage";
import { send } from "process";
interface TaskDetailProps {
  ticketId: string;
}
const TaskDetail: React.FC<TaskDetailProps> = ({ ticketId }) => {
  const router = useRouter();
  const { user } = useAuthStore();
  const ticket = useTicketStore(selectTicketById(ticketId));
  const atmSelector = ticket?.atmId ? selectAtmById(ticket.atmId) : () => null;
  const atm = useAtmStore(atmSelector);
  const { addLog } = useTransparencyStore();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const [arrived, setArrived] = useState(false);
  const [verified, setVerified] = useState(false);
  const [distance, setDistance] = useState<number | null>(null);
  const { vibrate, playArrivalSound } = useFeedback();
  const [activeStep, setActiveStep] = useState(0);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [otpOpen, setOtpOpen] = useState(false);
  const [otpId, setOtpId] = useState<string | null>(null);

  useEffect(() => {
    let step = 0;
    if (!arrived) step = 0;
    else if (arrived && !verified) step = 1;
    else if (verified && !ticket?.resolution?.proofPhotoUrl) step = 2;
    else if (
      ticket?.resolution?.proofPhotoUrl &&
      !(ticket?.status === "RESOLVED")
    )
      step = 3;

    if (ticket?.status === "RESOLVED") step = 4;
    setActiveStep(step);
  }, [arrived, verified, ticket]);
  const [checklist, setChecklist] = useState([
    { id: "validate", label: "Arrival at ATM location", done: true },
    { id: "verify", label: "On-site Verification", done: true },
    { id: "repair", label: "Perform repair", done: false },
    { id: "proof", label: "Upload proof photo", done: false },
    { id: "complete", label: "Mark complete", done: false },
  ]);

  // Load mock data
  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        await Promise.all([
          useTicketStore.getState().refresh(),
          useAtmStore.getState().refresh(),
        ]);
        addLog({
          type: "system-event",
          details: `Loaded task detail for Ticket #${ticketId}`,
          severity: "info",
        });
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();

    return () => {
      mounted = false;
    };
  }, [ticketId]);

  // Haversine Distance Helper
  function distanceBetween(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) {
    const toRad = (v: number) => (v * Math.PI) / 180;
    const R = 6371e3;
    const φ1 = toRad(lat1);
    const φ2 = toRad(lat2);
    const Δφ = toRad(lat2 - lat1);
    const Δλ = toRad(lon2 - lon1);
    const a =
      Math.sin(Δφ / 2) ** 2 +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  useEffect(() => {
    if (!atm?.location.coordinates) return;

    // Example starting point (simulate "far away" user)
    let userLat = atm.location.coordinates.lat - 0.001;
    let userLng = atm.location.coordinates.lng - 0.001;

    let steps = 10; // number of steps to reach ATM
    const latStep = (atm.location.coordinates.lat - userLat) / steps;
    const lngStep = (atm.location.coordinates.lng - userLng) / steps;

    const intervalId = setInterval(() => {
      if (steps > 0) {
        userLat += latStep;
        userLng += lngStep;
        setUserLocation({ lat: userLat, lng: userLng });
        setDistance(
          distanceBetween(
            userLat,
            userLng,
            atm.location.coordinates.lat,
            atm.location.coordinates.lng
          )
        );

        steps--;
      } else {
        clearInterval(intervalId);
        setArrived(true);
        (async () => {
          await sendWhatsAppMessage({
            to: "+2348085716180",
            message: `You have arrived at ATM #${atm.id} (location: ${atm.location.branchName}). Please proceed with verification.`,
          });
          toast.success("Message sent");
        })();
        addLog({
          type: "user-action",
          details: `Engineer arrived at ATM #${
            atm?.id || "unknown"
          } (distance ≤ 50m)`,
          severity: "info",
          user: { role: "engineer", id: user?.id },
        });
      }
    }, 1000); // move every second

    return () => clearInterval(intervalId);
  }, [atm, addLog, user?.id]);

  // Simulate verification (HQ confirmation)
  useEffect(() => {
    if (arrived && !verified) {
      sendWhatsAppMessage({
        to: "+2348085716180",
        message:
          "Your verification code is 930912. Please enter this code on-site to complete verification.",
      });
      const timer = setTimeout(() => {
        setVerified(true);
        addLog({
          type: "user-action",
          details: `On-site verification successful for Ticket #${ticket?.id}`,
          severity: "info",
          user: { role: "engineer", id: user?.id },
        });
        vibrate();
        sendWhatsAppMessage({
          to: "+2348085716180",
          message: `Verification completed for Ticket #${ticket?.id}. You may proceed with repairs.`,
        });
        // playVerificationSound();
        toast.success("Verification successful!");
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, [arrived, vibrate, verified, addLog, user?.id, ticket?.id]);

  const handleProofUpload = async (base64: string) => {
    if (!ticket) return;
    setActionLoading(true);
    try {
      useTicketStore.getState().updateTicket(ticket.id, {
        resolution: {
          ...(ticket.resolution || {}),
          proofPhotoUrl: base64,
          summary: ticket.resolution?.summary ?? "Proof uploaded",
          resolvedAt: ticket.resolution?.resolvedAt ?? new Date().toISOString(),
          timeSpentMinutes: ticket.resolution?.timeSpentMinutes ?? 0,
        },
      });
      localStorage.setItem(`ticket-proof-${ticket.id}`, base64);
      setChecklist((prev) =>
        prev.map((c) => (c.id === "proof" ? { ...c, done: true } : c))
      );
      toast.success("Proof uploaded");
      addLog({
        type: "user-action",
        details: `Proof photo uploaded for Ticket #${ticket.id}`,
        severity: "info",
        user: { role: "engineer", id: user?.id },
        meta: { proofLength: base64.length },
      });
      sendWhatsAppMessage({
        to: "+2348085716180",
        message: `Proof of fix uploaded for Ticket #${ticket.id}. Please review and mark the task as complete.`,
      });
    } catch {
      setError("Failed to upload proof.");
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
  async function handleMarkComplete() {
    if (!ticket) return;
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

    setActionLoading(true);
    try {
      await useTicketStore.getState().resolveTicket(ticket.id, {
        summary: "Issue resolved successfully",
        resolvedAt: new Date().toISOString(),
        timeSpentMinutes: Math.floor(Math.random() * 60) + 20,
        proofPhotoUrl: proofUrl,
      });
      setChecklist((prev) =>
        prev.map((c) => (c.id === "complete" ? { ...c, done: true } : c))
      );
      addLog({
        type: "user-action",
        details: `Engineer marked Ticket #${ticket.id} as complete.`,
        severity: "info",
        user: { role: "engineer", id: user?.id },
      });
      sendWhatsAppMessage({
        to: "+2348085716180",
        message: `Task for Ticket #${ticket.id} has been marked complete. Thank you!`,
      });
      toast.success("Task completed — redirecting...");
      setTimeout(() => {
        router.push("/engineer");
      }, 2500);
    } catch {
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
  }

  if (loading)
    return (
      <main className="min-h-screen flex flex-col items-center justify-center text-gray-500 gap-6">
        {/* Wrap with motion.div for staggered animation */}
        <motion.div
          className="flex flex-col gap-6"
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.3 } },
          }}
        >
          {/* Repeat the skeleton items (3) */}
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="min-w-[300px] h-56 flex flex-col gap-4"
            >
              {/* Main skeleton element */}
              <Skeleton className="h-24 w-full animate-pulse" />

              {/* Skeleton for user details */}
              <div className="flex items-start gap-3">
                <Skeleton className="h-8 w-8 rounded-full animate-pulse" />
                <div className="flex flex-col gap-2">
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
  const steps = [
    "Arrival",
    "Verification",
    "Repair",
    "Proof Upload",
    "Completion",
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title={`Task #${ticket.id}`} subtitle="Engineer Workflow" />
      <MultiStepProgress steps={steps} activeStep={activeStep} />
      <main className="max-w-3xl mx-auto p-4 space-y-5">
        <AnimatePresence mode="wait">
          {!arrived && (
            <motion.div
              key="map"
              initial={{ opacity: 0, y: 80, animationDuration: 0.6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -80, animationDuration: 0.8 }}
            >
              <ArrivalBanner arrived={arrived} distance={distance} />
              {/* <TaskMapCard atm={atm} userLocation={userLocation} /> */}
            </motion.div>
          )}

          {arrived && !verified && (
            <motion.div
              key="verify"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <VerificationPanel />
            </motion.div>
          )}

          {verified && (
            <motion.div
              key="details"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Checklist checklist={checklist} setChecklist={setChecklist} />
              <UploadProof onSuccess={handleProofUpload} />
              {ticket.resolution?.proofPhotoUrl && (
                <section className="mx-auto flex flex-col items-center">
                  <h3 className="text-lg font-semibold">Uploaded Proof</h3>
                  <div className="mt-2 mx-auto">
                    <Image
                      src={ticket.resolution.proofPhotoUrl}
                      alt="Proof Photo"
                      width={400}
                      height={300}
                      className="rounded border"
                    />
                  </div>
                </section>
              )}

              <button
                onClick={handleMarkComplete}
                className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
              >
                Mark Task Complete
              </button>
              <SupportPanel />
            </motion.div>
          )}
        </AnimatePresence>
        <TaskSummaryCard ticket={ticket} atm={atm} />
      </main>
    </div>
  );
};
export default TaskDetail;
