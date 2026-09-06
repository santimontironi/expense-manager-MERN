import { categorySchema } from "../../../shared/schemas/category-schema.js"
import api from "./api"

export const getCategoriesService = async () => {
    const response = await api.get("/categories")
    return categorySchema.array().parse(response.data)
}