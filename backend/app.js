import express from 'express'
import { db } from './config/db.js'
import dotenv from 'dotenv'
import cors from 'cors'
import userRouter from './routes/userRoutes.js'
import globalErrorHandler from 'express-async-handler'
import chatRouter from './routes/chatRoutes.js'

dotenv.config()
db()
let app=express()

//middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
//users
app.use("/api/v1/user",userRouter)
app.use("/api/v1/chat",chatRouter)

app.all("*",(req,res,next)=>{
    let err=new Error(`Page Not Fount ${req.originalUrl}`)
    err.status(404)
    next(err)

})

app.use(globalErrorHandler)
export default app;