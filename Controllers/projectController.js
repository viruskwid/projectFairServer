const projects = require('../Models/projectModel')

//add projects 

exports.addprojects = async (req,res)=>{
    console.log("Inside Add project Api!!!");
    const {title,languages,overview,github,website} = req.body
    const projectImages = req.file.filename
    const userId = req.payload 
    //console.log(title,overview,language,github,website,projectImage,userId);
    try{
        const existingProject = await projects.findOne({github})
        if (existingProject) {
            res.status(406).json("project already exist!! please try with another one")
        }else{
            console.log("add new project");
            const newProject = new projects({
                title,languages,overview,github,website,projectImages,userId
            })
            await newProject.save()
            res.status(200).json(newProject)
        }
       

    }catch(err){
      res.status(402).json(err)
    }
}

//get homepage projects 

exports.getHomeProjects = async (req,res)=>{
    
     try{
        const allProjects = await projects.find().limit(3)
        res.status(200).json(allProjects)
     }catch(err){
        res.status(401).json(err)
     }
}
//get all projects
exports.getAllProjects=async (req,res)=>{
    const searchKey = req.query.search
    const query ={
        languages:{ $regex:searchKey, $options:"i"}
    }
    try{
        const allProjects = await projects.find(query)
        res.status(200).json(allProjects)
    }catch(err){
        res.status(401).json(err)
    }
}

//get user projects

exports.getUserProjects = async (req,res)=>{
    const userId = req.payload
    try{
        const userProjects = await projects.find({userId})
        res.status(200).json(userProjects)
    }catch(err){
        res.status(401).json(err)
    }
}

//edit project 
exports.editProject = async (req,res)=>{
    const {title,overview,languages,github,website,projectImages} = req.body
    const uploadImage =req.file?req.file.filename:projectImages
    const userId =  req.payload
    const {pid} = req.params
    try{
        const updateProject = await projects.findByIdAndUpdate({_id:pid},{
            title,languages,overview,github,website,projectImages:uploadImage,userId
        },{new:true})
        await updateProject.save()
        res.status(200).json(updateProject)
    }catch(err){
        res.status(401).json(err)
    }
}

//delete project
exports.removeProject = async (req,res)=>{
    const {pid} = req.params

    try{
        const deleteData = await projects.findByIdAndDelete({_id:pid})
        res.status(200).json(deleteData)
    }catch(err){
        res.status(401).json(err)
    }
}