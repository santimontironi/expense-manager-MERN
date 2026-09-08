import { categorySchema, categoryDetailSchema } from "../../../shared/schemas/category-schema.js"
import type { CreateCategoryCredentials } from "../types/category.types.js"
import api from "./api"

export const getCategoriesService = async () => {
    const response = await api.get("/categories")
    return categorySchema.array().parse(response.data)
}

export const newCategoryService = async (categoryData: CreateCategoryCredentials) => {
    const response = await api.post("/categories", categoryData)
    return categorySchema.parse(response.data)
}

export const getCategoryByIdService = async (id: string) => {
    const response = await api.get(`/categories/${id}`)
    return categoryDetailSchema.parse(response.data)
}