"use server";
import { signOut } from "@/auth";

export const logout = async () => {
  // Do server staff
  await signOut();
};
