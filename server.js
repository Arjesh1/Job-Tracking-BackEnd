import * as dotenv from 'dotenv'
dotenv.config()

import express from 'express'
const app = express()

import morgan from 'morgan'
if(process.env.NODE_ENV === 'development'){
app.use(morgan('dev'))
}

fetch('https://www.course-api.com/react-useReducer-cart-project')
.then((res) => res.json())
.then((data) => console.log(data))

app.use(express.json())

app.get('/', (req, res) =>{
    res.send('Hello world')
})

app.post('/', (req, res) =>{
    console.log(req.body)
    res.json({message: 'data received', data: req.body})
})

const PORT = process.env.PORT || 5100   
app.listen(PORT, () =>{
    console.log(`server running at ${PORT}`)
})

