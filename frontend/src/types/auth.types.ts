import { z } from "zod";
import { loginSchema } from "../../../shared/schemas/auth-schema.js";

export type LoginCredentials = z.infer<typeof loginSchema>;