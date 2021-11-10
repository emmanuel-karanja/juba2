const projectValidator=require('./project.validator');
const Project=require('./project.model');
const userService=require('../../api/graphql/users');
exports.getCount=async(currentUser)=>{
    //returns count
    try{
        const count=await Project.countDocuments({createdBy:currentUser._id});
        return count;
    }catch(error){
        throw error;
    }
}

exports.getAll=async(currentUser)=>{
     try{
         const projects=await Project.find({createdBy: currentUser._id})
                                     .sort({id:-1})
                                     .populate('createdBy', 'firstName lastName email')
                                     .populate('modifiedBy', 'firstName lastName email')
                                     .populate('contributors', 'firstName lastName email')
                                     .exec();
        // const projectProfiles=projects.map(project=> project.toProfileProject());
         return projects;
     }catch(error){
         console.log(error);
         throw error;
     }
}

exports.getProjectById=async(currentUser,projectId)=>{
    try{
        const project=await Project.findById(projectId)
                                   .populate('createdBy', 'firstName lastName email')
                                   .populate('modifiedBy', 'firstName lastName email')
                                   .populate('contributors', 'firstName lastName email')
                                   .exec();
        if(!project)
            throw new Error(`Project with id: ${projectId} not found!`);
        return project;
    }catch(error){
        console.log(error);
        throw error;
    }
}

exports.create=async (currentUser,projectDTO)=>{   
    if(projectDTO === 'undefined')
         projectDTO.status='Not-Started';
    const {isValid, errors}=projectValidator.validateNew(projectDTO);
    if(!isValid)
        throw new Error(errors);
    const newProject=new Project(projectDTO);
    try{
        newProject.createdBy=currentUser._id;
        newProject.createdOn=new Date;
        newProject.modifiedOn=new Date;
        const project=await newProject.save();
        console.log('Project successfully created');
        //emit events here e.g. eventService.emit('project_created', project.toProfileProject());
        return project;
    }catch(error){
        console.log(error);
        throw error;
    }
}

exports.update=async (currentUser,projectId,updatedProjectDTO)=>{  
    const {isValid, errors}=projectValidator.validateUpdate(updatedProjectDTO); 
    if(!isValid)
       throw new Error(errors);
    try{
     updatedProjectDTO.modifiedOn=new Date;
     updatedProjectDTO.modifiedBy=currentUser._id;
      const project=await Project.findByIdAndUpdate(projectId,updatedProjectDTO);
      console.log('Project successfully updated');
      //emit events //emit events here e.g. eventService.emit('project_updated', project.toProfileProject());
      return project;
    }catch(error){
        console.log(error);
        throw error;
    }
}

exports.delete=async(projectId)=>{
    try{
       let project= await Project.findByIdDelete(projectId);
        console.log(`Project with id: ${projectId} successfully deleted`);
       return true;
    }catch(error){
        console.log(error);
        throw error;
    }
}

exports.addContributor=async(currentUser,projectId,contributorId)=>{
    //fetches the contributor and inserts
    try{
        const project=await Project.findById(projectId);
        if(!project)
          throw new Error(`Project with id: ${projectId} does not exist`);
        const contributor=await userService.getUserById(contributorId);
        if(!contributor)
           throw new Error(`User with id: ${contributorId} does not exist and cannot be added as contributor`);
    //does this contributor already exist in the project?
    if(project.contributors.includes(contributorId))
         throw new Error('The user already exists as a contributor on this project');
     project.contributors.push(contributorId);
     project.modifiedBy=currentUser._id;
     project.save();
     return project;
    }catch(error){
        console.log(error);
        throw error;

    }
}

exports.removeContributor=async(currentUser,projectId,contributorId)=>{
   //fetches contributor and inserts
   try{
    const project=await Project.findById(projectId);
    if(!project)
      throw new Error(`Project with id: ${projectId} does not exist`);
    //check that the contributor's array actually contains this contributorId
    if(!project.contributors.includes(contributorId))
        throw new Error('User is not a contributor on this project');
    project.contributors.remove(contributorId);
    project.modifiedBy=currentUser._id;
    project.save();
    return true;
     }catch(error){
     console.log(error);
     throw error;
   }
   
}

exports.updateStatus=async(currentUser,projectId,newStatus)=>{
    try{
        const project=await Project.findById(projectId);
        //implement rules for updating the status here//

        project.changeStatus(newStatus);
        project.modifiedBy=currentUser._id;
        project.save();
        //emit events here  e.g. eventService.emit('project_status_change', projectId, newStatus)//
       return project;
    }catch(error){
        console.log(error);
        throw error;
    }
}

