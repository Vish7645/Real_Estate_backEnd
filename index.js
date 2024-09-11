import express from 'express'
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
// const authRouter=require('./routes/auth.route.js')
// const mongoose=require('mongoose')
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import listingRouter from './routes/listing.route.js';
import path from 'path';

dotenv.config({ path: '../.env' });
const app=express()
const PORT=3000

app.use(express.json())
app.use(cookieParser());
mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log('Database Connected')
})
.catch((err)=>{
    console.log(err)
})

const __dirname = path.resolve();

app.use('/api/user',userRouter)
app.use('/api/auth',authRouter)
app.use('/api/listing',listingRouter);


app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})

app.use((err,req,res,next)=>{
    const statusCode=err.statusCode || 500
    const message=err.message  || 'Internal Server Error'
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})


app.listen(PORT,()=>{
    console.log(`Server is Running at ${PORT}`)
})



