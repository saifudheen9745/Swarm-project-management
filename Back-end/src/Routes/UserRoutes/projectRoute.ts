import express from 'express'
import { createProject } from '../../Controllers/UserControllers/projectControllers'

const Router = express.Router()


Router.post('/create', createProject)


export default Router