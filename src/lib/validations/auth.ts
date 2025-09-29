import { RoleUser, RoleUserValue } from "@/config/enum-type";
import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().min(1),
  password: z.string().min(8),
  remember: z.unknown().optional()
});

export const registerCreateSchema = z.object({
  name: z.string().min(4, "Name is required"),
  email: z.string().min(3, "email is required"),
  password: z.string().min(8, "password min 8"),
  password_confirmation: z.string().min(8, "password min 8"),
  role: z.enum(RoleUserValue).optional().default("user"),
});



export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerCreateSchema>;