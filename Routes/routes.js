const express = require('express')
const router = express.Router()
const userController = require('../Controllers/userController')
const projectController = require('../Controllers/projectController')
const jwtMiddleware = require('../Middlewares/jwtMiddleware')
const multerConfig = require('../Middlewares/multerMiddleware')

//route for register
router.post('/register' , userController.register )
//login
router.post('/login' , userController.login)
//addproject
router.post('/addproject' ,jwtMiddleware,multerConfig.single('projectImages'), projectController.addprojects)
//get home projects
router.get('/home-projects',projectController.getHomeProjects)
//get all projects
router.get('/all-projects',jwtMiddleware, projectController.getAllProjects)
//get user projects
router.get('/user-projects',jwtMiddleware, projectController.getUserProjects)
//edit project 
router.put('/project/edit/:pid',jwtMiddleware,multerConfig.single("projectImages"),projectController.editProject)
//reomve projects
router.delete('/project/remove/:pid',jwtMiddleware,projectController.removeProject)

///update profile
router.put('/user/update',jwtMiddleware,multerConfig.single("profileImage"),userController.editUser)

module.exports = router   