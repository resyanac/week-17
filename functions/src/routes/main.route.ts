import express from 'express'
import { Request, Response } from 'express'
const routes = express.Router()
import taxRoutes from './tax.route'
import userRoutes from './user.route'
// import authenticationMiddleware from '../middlewares/authentication-middleware'


routes.get('/', (req: Request, res : Response) => {
    res.status(200).json({
        success: true,
        message: 'Welcome to week 17'
    })
})

routes.use('/', taxRoutes)
routes.use('/', userRoutes)

export default routes;