import {body, param ,validationResult } from 'express-validator'
import {BadRequestError, NotFoundError} from '../errors/customErrors.js'
import { JOB_STATUS, JOB_TYPE } from '../utils/constants.js'
import mongoose from 'mongoose'
import JobModel from '../models/JobModel.js'

const withValidationErrors = (validateValues) => {
    return [
        validateValues, 
    (req, res, next)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        const errorMessages = errors.array().map((error) => error.msg)
        if (errorMessages[0].startsWith('No job')){
            throw new NotFoundError(errorMessages)
        }
       throw new BadRequestError(errorMessages)
    }
    next()
}
]
}

export const validateJobInput = withValidationErrors([
    body('company').notEmpty().withMessage('Company is required'),
    body('position').notEmpty().withMessage('Position is required'),
    body('jobLocation').notEmpty().withMessage('Job Location is required'),
    body('jobStatus').isIn(Object.values(JOB_STATUS)).withMessage('Invalid job status'),
    body('jobType').isIn(Object.values(JOB_TYPE)).withMessage('Invalid job type'),
])

export const validateIdParam = withValidationErrors([
    param('id')
    .custom(async (value) =>{
        const isValidId = mongoose.Types.ObjectId.isValid(value)
        if(!isValidId) throw new Error('Invalid MongoDb id')
        const job = await JobModel.findById(value)
        if(!job) throw new NotFoundError(`No job found.`)
    }),
])