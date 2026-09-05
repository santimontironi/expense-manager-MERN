import app from "./app.js"
import { connectDB } from "./configs/db.config.js"

const startServer = async () => {
    await connectDB()
    app.listen(process.env.PORT, () => {
        console.log(`Servidor corriendo en puerto: ${process.env.PORT}`)
    })
}

export default startServer