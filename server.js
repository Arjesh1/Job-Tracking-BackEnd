import * as dotenv from 'dotenv'
dotenv.config()

import express from 'express'
const app = express()

import mongoose from 'mongoose'



//routers
import jobRouter from './routes/jobRouter.js'
app.use

import morgan from 'morgan'
if(process.env.NODE_ENV === 'development'){
app.use(morgan('dev'))
}

app.use(express.json())

app.get('/', (req, res) =>{
    res.send('Hello world')
})

app.post('/', (req, res) =>{
    console.log(req.body)
    res.json({message: 'data received', data: req.body})
})

app.use('/api/v1/jobs', jobRouter)
app.use('/api/v1/jobs/:id', jobRouter)

app.use('*', (req, res) =>{
    res.status(404).json({msg: "Not found"})
})

app.use((err, req, res, next) =>{
    console.log(err)
    res.status(500).json({msg: "Something went wrong"})
})

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


