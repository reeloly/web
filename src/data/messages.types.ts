import { z } from "zod";

export type EventMessage = AgentMessageDeltaEvent | AgentMessageEndEvent;

export const agentMessageDeltaEventSchema = z.object({
  type: z.literal("agent.message.delta"),
  delta: z.string(),
});

export type AgentMessageDeltaEvent = z.infer<
  typeof agentMessageDeltaEventSchema
>;

export const agentMessageEndEventSchema = z.object({
  type: z.literal("agent.message.end"),
});

export type AgentMessageEndEvent = z.infer<typeof agentMessageEndEventSchema>;
