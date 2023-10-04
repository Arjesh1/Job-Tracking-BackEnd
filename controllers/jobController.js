import JobModel from '../models/JobModel.js'


import { nanoid } from 'nanoid'
let jobs = [
  { id: "123456", company: 'apple', position: 'front-end' },
  { id: "678910", company: 'google', position: 'back-end' },
];



//get all jobs
export const getAllJobs = async (req, res) =>{
    await res.status(200).json(jobs)
}

//get selected jobs
export const getSelectedJob = (req, res) =>{
    const {id} = req.params
    const job = jobs.find((job) => job.id === id)
    if(!job){
        return res.status(400).json({message: "Job does not exists"})
    }
    res.status(200).json(job)
}

//add job
export const createJob =  async (req, res) => {
    const {company, position} = req.body
    const job = await JobModel.create({company, position})
    res.status(200).json({job})
}

//update job
export const updateJob = (req, res) =>{
     const {company, position} = req.body
     if(!company || !position){
       return res.status(400).json({message: "Please provide company and position"})
    }
    const {id} = req.params
    const job = jobs.find((job) => job.id === id)
    if(!job){
        return res.status(400).json({message: "No job found"})
    }
    job.company = company
    job.position = position
    res.status(200).json({msg: "Updated successfully", job})
}

//delete job
export const deleteJob = (req, res) =>{
    const {id} = req.params
    const job = jobs.find((job) => job.id === id)
    if(!job){
        return res.status(400).json({message: "No job found!"})
    }
   const newJobs = jobs.filter((job)=> job.id != id)
   jobs =  newJobs
    res.status(200).json({msg: "Deleted successfully", jobs})
}