import JobModel from '../models/JobModel.js'
import {StatusCodes} from 'http-status-codes'


//get all jobs
export const getAllJobs = async (req, res) =>{
    const jobs = await JobModel.find({})
    res.status(StatusCodes.OK).json(jobs)
}

//get selected jobs
export const getSelectedJob = async (req, res) =>{
    const job = await JobModel.findById(req.params.id)
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
    const updatedJob = await JobModel.findByIdAndUpdate(req.params.id, req.body, {new:true})
    res.status(StatusCodes.OK).json({msg: "Job updated successfully", updatedJob})
}

//delete job
export const deleteJob = async (req, res) =>{
    const removedJob = await JobModel.findByIdAndDelete(req.params.id)
    res.status(StatusCodes.OK).json({msg: "Job Deleted successfully"})
}