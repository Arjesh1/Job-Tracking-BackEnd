import JobModel from '../models/JobModel.js'

//get all jobs
export const getAllJobs = async (req, res) =>{
    const jobs = await JobModel.find({})
    res.status(200).json(jobs)
}

//get selected jobs
export const getSelectedJob = async (req, res) =>{
    const {id} = req.params
    const job = await JobModel.findById(id)
    if(!job){
        return res.status(400).json({message: "Job does not exists!"})
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
export const deleteJob = async (req, res) =>{
    const {id} = req.params
    const removedJob = await JobModel.findByIdAndDelete(id)
    if(!removedJob){
        return res.status(400).json({message: "No job found!"})
    }
    res.status(200).json({msg: "Deleted successfully", removedJob})
}