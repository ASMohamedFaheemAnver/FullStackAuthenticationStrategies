"use server";

import { registerSchema } from "@/schemas";
import * as z from "zod";

export const register = async (values: z.infer<typeof registerSchema>) => {
  console.log({ values });
  const validatedFields = registerSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  return { success: "Email sent!" };
};
