import { categorySchema, createCategorySchema, categoryDetailSchema } from "../../../shared/schemas/category-schema";
import { z } from "zod";

export type Category = z.infer<typeof categorySchema>;
export type CreateCategoryCredentials = z.infer<typeof createCategorySchema>;
export type CategoryDetail = z.infer<typeof categoryDetailSchema>