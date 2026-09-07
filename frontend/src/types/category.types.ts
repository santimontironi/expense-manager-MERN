import { categorySchema, createCategorySchema } from "../../../shared/schemas/category-schema";
import { z } from "zod";

export type Category = z.infer<typeof categorySchema>;
export type CreateCategoryCredentials = z.infer<typeof createCategorySchema>;