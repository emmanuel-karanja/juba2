const  projectService=require('../../../domain/projects/project.service');

const getAll=async(parent,args,{currentUser})=>{ 
    try{
     const allProjects=await projectService.getAll(currentUser);
     return allProjects;
    }catch(error){
     throw error;
    }
}

const getProjectById=async(parent,args,{currentUser})=>{  
    const {projectId}=args;
    try{
      const project=await projectService.getProjectById(currentUser,projectId);
      return project;
    }catch(error){
    throw error;
    }
}

const getCount=async(parent,args,{currentUser})=>{  
    try{
     const counts=await projectService.getCount(currentUser);
     return counts;
    }catch(error){
     throw error;
    }
}

const create=async(parent,args,{currentUser})=>{
    const {newProject}=args;
    try{
     const savedProject=await projectService.create(currentUser,newProject);
     return savedProject;
    }catch(error){
    throw error;
    }
}

const update=async(parent,args,{currentUser})=>{
    const {updatedProject, id}=args;
    try{
    const savedProject=await projectService.update(currentUser,id, updatedProject);
    return savedProject;
    }catch(error){
     throw error;
    }
}

const deleteProject=async(parent,args,{currentUser})=>{
    const{projectId}=args;
    try{
    const result=await projectService.delete(currentUser,projectId);
    return result;
    }catch(error){
     throw error;
    }
}



const updateStatus=async(parent,args,{currentUser})=>{
    const{projectId, newStatus}=args;
      try{
      const updatedProject=await projectService.updateStatus(currentUser,projectId, newStatus);
      return updatedProject;
      }catch(error){
       throw error;
      }
}

const addContributor=async(parent, args, {currentUser})=>{
    const{projectId, contributorId}=args;
    try{
     const updatedProject=await projectService.addContributor(currentUser,projectId,contributorId);
     return updatedProject;
    }catch(error){
        throw error;
    }
}

const removeContributor=async(parent, args,{currentUser})=>{
    const {projectId,contributorId}=args;
    try{
     const result=await projectService.removeContributor(currentUser,projectId,contributorId);
     return result;
    }catch(error){
        throw error;
    }
}

const getCreatedBy=async(parent)=>{
    if(parent.createdBy){
        return {
            fullName: parent.createdby.firstName+' '+parent.createdBy.lastName,
            email: parent.createdBy.email,
            _id: parent.createdBy._id,
        }
    }else{
        return null;
    }
}

const getModifiedBy=async(parent)=>{
   if(parent.modifiedBy){
    return {
        fullName: parent.createdby.firstName+' '+parent.createdBy.lastName,
        email: parent.createdBy.email,
        _id: parent.createdBy._id,
    }
   }else{
       return null;
   }   
}

const getContributors=async(parent)=>{
    if(parent.contributors){
      return parent.contributors;
    }else{
        return null
    }
}

const getTasks=async(parent)=>{
    if(parent.tasks){
        return parent.tasks;
    }else{
        return null;
    }
}


module.exports={
    create,update,deleteProject,getProjectById,getAll,getCount,
    updateStatus,getCreatedBy,getModifiedBy,getContributors,
    addContributor,removeContributor,getTasks
}