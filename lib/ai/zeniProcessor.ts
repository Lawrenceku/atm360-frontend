// /lib/ai/zeniProcessor.ts
import chat from "@/lib/ai";
import { AIThinkerObject, ActionObject } from "@/types/zeniTypes";

export async function processZeniStage1(
  userInput: string
): Promise<AIThinkerObject | null> {
  const basePrompt = `
You are Zeni, an operational assistant for ATM360, built for Nigerian bank operations.
Your goal is to interpret user commands and output a structured JSON AIThinkerObject.

Output format:
{
  "intent": "downloadReport" | "analyzeDowntime" | "startOnboarding" | "navigate" | "unknown",
  "targetStores": ["atm", "ticket"],
  "actions": ["redirectToPage('/ops/reports')", "executeFunction('downloadReports')"],
  "requiredData": ["reportDates"],
  "nextQuery": "Generate system instruction for executing these actions."
}
`;

  const response = await chat(`${basePrompt}\nUser Input: ${userInput}`);
  try {
    return JSON.parse(response?.content || "{}") as AIThinkerObject;
  } catch {
    console.warn("Failed to parse Stage 1 AIThinkerObject");
    return null;
  }
}

export async function processZeniStage2(
  thinker: AIThinkerObject
): Promise<ActionObject | null> {
  const actionPrompt = `
You are Zeni, continuing from Stage 1. 
The following intent and stores were detected:
${JSON.stringify(thinker, null, 2)}

Now generate a final ActionObject in this format:
{
  "userResponse": "Short, clear response for UI display",
  "executionSteps": ["redirectToPage('/ops/reports')"],
  "resultType": "pdf",
  "data": { ...optional data... }
}
`;

  const response = await chat(actionPrompt);
  try {
    return JSON.parse(response?.content || "{}") as ActionObject;
  } catch {
    console.warn("Failed to parse Stage 2 ActionObject");
    return null;
  }
}
