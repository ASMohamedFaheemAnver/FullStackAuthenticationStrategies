"use server";

import { loginSchema } from "@/schemas";
import * as z from "zod";

export const login = async (values: z.infer<typeof loginSchema>) => {
  console.log({ values });
  const validatedFields = loginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  return { success: "Email sent!" };
};
