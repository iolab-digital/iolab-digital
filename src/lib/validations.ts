import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  company: z.string().optional(),
  industry: z.string().optional(),
  serviceInterest: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
  budgetRange: z.string().optional(),
  currentTools: z.string().optional(),
  honeypot: z.string().max(0, "Bot detected").optional(),
});

export const subscribeSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  name: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
export type SubscribeFormData = z.infer<typeof subscribeSchema>;
