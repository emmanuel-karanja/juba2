//each controller obtains the currentUser from the request object and performs authorization checks
//authorization will be done at the routes level, the controller simply unpacks the user
//and some of the params and performs the service call
const taskService=require('../../../domain/tasks/task.service');
const projectService=require('../../../domain/projects/project.service')
exports.getAll=(req,res)=>{

}
exports.getProject=(req,res,next, projectId)=>{
  try{
    const project=await projectService.getProjectById(projectId);
    req.project=project;
    next();
  }catch(error){
    console.log(error);
    res.status(500).json({error:error});
  }
}
exports.getTaskById=(req,res)=>{
   const project=req.project;

}

exports.create=(req,res)=>{
   const project=req.project;
}

exports.delete=(req,res)=>{
    const project=req.project;
}

exports.update=(req,res)=>{
    const project=req.project;
}