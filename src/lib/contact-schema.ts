import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Please tell us your name").max(100, "Name must be under 100 characters"),
  email: z.string().trim().email("Please enter a valid email").max(255, "Email must be under 255 characters"),
  message: z
    .string()
    .trim()
    .min(1, "Please write a message")
    .max(2000, "Message must be under 2000 characters"),
  /** Honeypot: real visitors never see or fill this field. */
  company: z.string().max(200).optional().default(""),
});

export type ContactInput = z.input<typeof contactSchema>;
