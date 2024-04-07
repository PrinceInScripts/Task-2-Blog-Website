import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'

const app=express()

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json({
    limit:"16kb"
}))

app.use(express.urlencoded({
    extended:true,
    limit:"50mb"
}))

app.use(express.static("public"))

app.use(cookieParser())

app.use(morgan('dev'))

import authRoutes from "./routes/auth.routes.js"
import userRoutes from "./routes/user.routes.js"
app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/users",userRoutes);


export {app}