import dotenv from "dotenv"
import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import authRoutes from "./routes/auth-routes.js"

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

export default app