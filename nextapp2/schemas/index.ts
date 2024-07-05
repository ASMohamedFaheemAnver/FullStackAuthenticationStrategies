import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1), // Login form password validation is not good since we might change them to different in the register form
  code: z.optional(z.string()),
});

export const registerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
});

export const resetSchema = z.object({
  email: z.string().email(),
});

export const newPasswordSchema = z.object({
  password: z.string().min(8),
});
