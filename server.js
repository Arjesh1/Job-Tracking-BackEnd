import 'express-async-errors'
import * as dotenv from 'dotenv'
dotenv.config()

import express from 'express'
const app = express()

import mongoose from 'mongoose'

//middleware
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js'


//routers
import jobRouter from './routes/jobRouter.js'
app.use

import morgan from 'morgan'
if(process.env.NODE_ENV === 'development'){
app.use(morgan('dev'))
}

app.use(express.json())

app.use('/api/v1/jobs', jobRouter)
app.use('/api/v1/jobs/:id', jobRouter)

app.use('*', (req, res) =>{
    res.status(404).json({msg: "Not found"})
})

app.use(errorHandlerMiddleware)

const PORT = process.env.PORT || 5100 
try {
    await mongoose.connect(process.env.MONGO_URL)
    app.listen(PORT, () =>{
    console.log(`server running at ${PORT}`)
})
} catch (error) {
    console.log(error)
    process.exit(1)
    
}  


