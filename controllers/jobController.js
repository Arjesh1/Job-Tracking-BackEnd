import JobModel from '../models/JobModel.js'
import {StatusCodes} from 'http-status-codes'
import {NotFoundError} from '../errors/customErrors.js'

//get all jobs
export const getAllJobs = async (req, res) =>{
    const jobs = await JobModel.find({})
    res.status(StatusCodes.OK).json(jobs)
}

//get selected jobs
export const getSelectedJob = async (req, res) =>{
    const {id} = req.params
    const job = await JobModel.findById(id)
    if(!job) throw new NotFoundError(`No job found.`)
    res.status(StatusCodes.OK).json(job)
}

//add job
export const createJob =  async (req, res) => {
      const {company, position} = req.body
      const job = await JobModel.create({company, position})
      res.status(StatusCodes.CREATED).json({job})  
}

//update job
export const updateJob = async (req, res) =>{
     const {company, position} = req.body
    const {id} = req.params
    const updatedJob = await JobModel.findByIdAndUpdate(id, req.body, {new:true})
    if(!updatedJob){
        return res.status(StatusCodes.NOT_FOUND).json({message: "No job found"})
    }
    res.status(StatusCodes.OK).json({msg: "Job updated successfully", updatedJob})
}

//delete job
export const deleteJob = async (req, res) =>{
    const {id} = req.params
    const removedJob = await JobModel.findByIdAndDelete(id)
    if(!removedJob){
        return res.status(StatusCodes.NOT_FOUND).json({message: "No job found!"})
    }
    res.status(StatusCodes.OK).json({msg: "Job Deleted successfully"})
}