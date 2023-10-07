import {Router} from 'express'
const router = Router()

import {getAllJobs, getSelectedJob, createJob, updateJob, deleteJob} from '../controllers/jobController.js'
import { validateJobInput } from '../middleware/validationMiddleware.js'

router.route('/').get(getAllJobs).post(validateJobInput, createJob)
router.route('/:id').get(getSelectedJob).patch(validateJobInput, updateJob).delete(deleteJob)
export default router