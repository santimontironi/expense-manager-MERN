import { categorySchema } from "../../../shared/schemas/category-schema";
import { z } from "zod";

export type Category = z.infer<typeof categorySchema>;