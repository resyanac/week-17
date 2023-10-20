import express from 'express'
import cors from 'cors'
import clientAccess from '../middlewares/cors'
import { getAllTax, getOneTax, createTax, updateTax, deleteTax, updateAllTax } from '../controllers/tax.controller'
// import authenticationMiddleware from '../middlewares/authentication-middleware'
import  checkRole  from '../middlewares/checkRole'

const taskRoutes = express.Router()

// taskRoutes.get('/v1/taxes',   checkRole(["admin", "staff", "approver"]), getAllTax)
// taskRoutes.get('/v1/taxes/:id',  checkRole(["admin", "staff", "approver"]), getOneTax)
// taskRoutes.post('/v1/taxes',checkRole(["admin", "approver"]),  createTax)

// taskRoutes.options('/v1/taxes/:id')
// taskRoutes.options('/v1/taxes/:id')
// taskRoutes.options('/v1/taxes')
// taskRoutes.patch('/v1/taxes/:id',   checkRole(["admin", "approver"]), updateTax)
// taskRoutes.put('/v1/taxes/:id',  checkRole([ "approver"]),  updateAllTax)
// taskRoutes.delete('/v1/taxes/:id',   checkRole([ "approver"]), deleteTax)

// taskRoutes.get('/v1/taxes', cors(clientAccess.globalClient),   checkRole(["admin", "staff", "approver"]), getAllTax)
// taskRoutes.get('/v1/taxes/:id', cors(clientAccess.globalClient),  checkRole(["admin", "staff", "approver"]), getOneTax)
// taskRoutes.post('/v1/taxes', cors(clientAccess.globalClient),  checkRole(["admin", "approver"]),  createTax)

// taskRoutes.options('/v1/taxes/:id')
// taskRoutes.options('/v1/taxes/:id')
// taskRoutes.options('/v1/taxes')
// taskRoutes.patch('/v1/taxes/:id', cors(clientAccess.globalClient),   checkRole(["admin", "approver"]), updateTax)
// taskRoutes.put('/v1/taxes/:id', cors(clientAccess.globalClient),  checkRole([ "approver"]),  updateAllTax)
// taskRoutes.delete('/v1/taxes/:id',cors(clientAccess.globalClient),   checkRole([ "approver"]), deleteTax)

taskRoutes.get('/v1/taxes', getAllTax)
taskRoutes.get('/v1/taxes/:id', getOneTax)
taskRoutes.post('/v1/taxes',    createTax)

taskRoutes.options('/v1/taxes/:id')
taskRoutes.options('/v1/taxes/:id')
taskRoutes.options('/v1/taxes')
taskRoutes.patch('/v1/taxes/:id', updateTax)
taskRoutes.put('/v1/taxes/:id',   updateAllTax)
taskRoutes.delete('/v1/taxes/:id', deleteTax)

export default taskRoutes