"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2, X } from "lucide-react";
import { useEngineerStore } from "@/lib/store/engineerStore";
import { useTicketStore } from "@/lib/store/ticketStore";
import { useTransparencyStore } from "@/lib/store/transparencyStore";
import { toast } from "sonner";

const aiSteps = [
  {
    step: "Zeni is collecting information about the alert...",
    stepCount: 4000,
  },
  { step: "Analyzing ATM location and fault type...", stepCount: 5000 },
  { step: "Searching for nearby available engineers...", stepCount: 3000 },
  {
    step: "Selecting engineer based on proximity and performance...",
    stepCount: 5000,
  },
  { step: "Sending WhatsApp message to engineer...", stepCount: 2000 },
  { step: "Waiting for engineer response...", stepCount: 10000 },
  { step: "Engineer has accepted the task.", stepCount: 1000 },
  {
    step: "Dispatch complete — Task ticket created. Alert Resolved",
    stepCount: 1000,
  },
  {
    step: "Waiting for engineer to upload proof of fix...",
    stepCount: 8000,
  },
  {
    step: "Proof of fix received. Zeni is analyzing realtime data from the ATM",
    stepCount: 8000,
  },
  {
    step: "ATM Operational. Ticket Closed.",
    stepCount: 2000,
  },
];

type AIActionPanelProps = {
  alert: Alert;
  onClose: () => void;
  handleAcknowledge: (id: string) => void;
};

export default function AIActionPanel({
  alert,
  onClose,
  handleAcknowledge,
}: AIActionPanelProps) {
  const [visibleSteps, setVisibleSteps] = useState<string[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completed, setCompleted] = useState(false);

  const engineers = useEngineerStore((s) => s.engineers);
  const assignEngineer = useEngineerStore((s) => s.assignEngineer);
  const addLog = useTransparencyStore((s) => s.addLog);
  const createTicket = useTicketStore((s) => s.createTicket);
  const panelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setTimeout(() => {
      if (panelRef.current) {
        panelRef.current.scrollTop = panelRef.current.scrollHeight;
      }
    }, 1000);
  }, [visibleSteps]);
  // Dispatch simulation
  const handleDispatch = async () => {
    const available = engineers.filter((e) => e.status === "available");
    const selected = available[Math.floor(Math.random() * available.length)];
    console.log(available, selected, engineers);
    if (!selected)
      toast.error("No available engineers to dispatch. Contacting Ops...");
    const ticket = await createTicket({
      atmId: alert.atmId,
      engineerId: selected.id,
      reportedBy: "SYSTEM",
      issueType: alert.type,
      severity: alert.severity,
      description: alert.message,
      status: "IN_PROGRESS",
    });

    assignEngineer(selected.id, ticket.id);
    addLog({
      type: "system-event",
      severity: "info",
      details: `Zeni AI dispatched ${selected.name} ${selected.surname} to handle alert ${alert.id} at ${alert.atmId}`,
      user: { role: "ops" },
      meta: { engineerId: selected.id, ticketId: ticket.id },
    });
  };

  // AI "thinking" simulation
  // AI "thinking" simulation using setInterval
  useEffect(() => {
    if (!alert) return;

    let index = 0;
    let intervalId: NodeJS.Timeout;

    const startInterval = () => {
      intervalId = setInterval(() => {
        if (index >= aiSteps.length) {
          clearInterval(intervalId); // cleanup
          setCompleted(true);
          handleDispatch();
          return;
        }

        const step = aiSteps[index];
        if (step) {
          setVisibleSteps((prev) => [...prev, step.step]);
          setCurrentStepIndex(index);
        }
        if (currentStepIndex === 6) handleAcknowledge(alert.id);
        index++;
      }, aiSteps[index]?.stepCount ?? 1000); // use current step duration
    };

    startInterval();

    return () => {
      clearInterval(intervalId); // cleanup on unmount
    };
  }, [alert]);

  return (
    <div className="relative w-[440px] p-6 overflow-hidden">
      <div
        className="relative space-y-5 overflow-y-auto max-h-[400px] scrollbar"
        ref={panelRef}
      >
        <AnimatePresence>
          {visibleSteps.map((step, index) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative flex items-start gap-4"
            >
              {/* Timeline connector */}
              {index !== visibleSteps.length - 1 && (
                <div className="absolute left-2 top-6 w-[2px] h-[calc(100%+12px)] bg-[var(--color-zenith-neutral-200)]" />
              )}

              {/* Step Icon */}
              <div className="relative z-10">
                {completed || index < currentStepIndex ? (
                  <CheckCircle2 className="w-5 h-5 text-[var(--color-zenith-success)]" />
                ) : index === currentStepIndex ? (
                  <Loader2 className="w-5 h-5 text-[var(--color-zenith-accent-500)] animate-spin" />
                ) : (
                  <div className="w-5 h-5 border border-[var(--color-zenith-neutral-300)] rounded-full" />
                )}
              </div>

              {/* Step Text */}
              <motion.p
                className={`text-sm leading-snug ${
                  index === currentStepIndex
                    ? "text-[var(--color-zenith-accent-700)] font-medium animate-pulse"
                    : "text-[var(--color-zenith-neutral-800)]"
                }`}
              >
                {step}
              </motion.p>
              {index === currentStepIndex && (
                <div className="ml-auto my-auto h-2 w-2 rounded-full bg-zenith-accent-600 animate-pulse" />
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {completed && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 w-full bg-[var(--color-zenith-accent-600)] text-white py-2 rounded-lg font-medium hover:bg-[var(--color-zenith-accent-700)] transition flex items-center gap-2 justify-center"
          onClick={onClose}
        >
          Close <X size={20} />
        </motion.button>
      )}

      {/* AI background glow */}
      <motion.div
        className="absolute inset-0 -z-10 bg-gradient-to-br from-[var(--color-zenith-accent-50)] via-[var(--color-zenith-neutral-50)] to-[var(--color-zenith-accent-100)] opacity-0"
        animate={{
          opacity: completed ? 0.15 : [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
