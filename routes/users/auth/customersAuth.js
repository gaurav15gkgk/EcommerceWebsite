import express from 'express'

import {signup} from '../../../controllers/users/auth/customer'
import {
    checkSignupParameters
} from '../../../controllers/middlewares/auth/customer'


const router = express.Router()

router.post('/signup',checkSignupParameters,  signup)


export default router