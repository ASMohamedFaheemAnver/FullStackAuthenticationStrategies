import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1), // Login form password validation is not good since we might change them to different in the register form
});
