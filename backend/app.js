import dotenv from "dotenv"
import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import { router as authRoutes } from './routes/auth-routes.js'
import { router as categoryRoutes } from "./routes/category-routes.js"
import { router as expenseRoutes } from "./routes/expense-routes.js"

dotenv.config()

const app = express()

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ["GET", "POST", "PATCH", "DELETE"]
}))

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/categories", categoryRoutes)
app.use("/api/expenses", expenseRoutes)

export default app