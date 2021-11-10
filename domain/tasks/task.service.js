const taskValidator=require('./task.validator');
const {Task}=require('./task.model');
const Project=require('../projects/project.model');
const userService=require('../../api/graphql/users');

exports.getCount=async(projectId)=>{
    //this is a little bit more involved, 
    try{
        const project=await Project.findById(projectId);
        if(!project)
          throw new Error(`Project with id: ${projectId} not found`);
        return project.tasks.length;
    }catch(error){
        console.log(error);
        throw error;
    }
}

exports.getAll=async(projectId)=>{
    //implement paging later
    try{
        const project=await Project.findById(projectId);
        if(!project)
            throw new Error(`Project with id: ${projectId} could not be found`);
        const taskProfiles=project.tasks.map(task=> task.toTaskProfile());
        return taskProfiles;
    }catch(error){
        console.log(error);
        throw error;
    }
}

exports.getTaskById=async(projectId,taskId)=>{
    try{
      const project=await Project.findById(projectId);
      if(!project) 
         throw new Error(`Project with id: ${projectId} not found`);
      const task=project.tasks.id(taskId);
       if(!task)
          throw new Error(`Task with id: ${taskId} not found`);
     return task;
    }catch(error){
        console.log(error);
        throw error;
    }
}


exports.update=async (currentUser,projectId,updatedTask)=>{
    //validate
    const{errors, isValid}=taskValidator.validateUpdate(updatedTask);
    if(!isValid)
         throw new Error(errors);
   try {
       const project = await Project.findById(projectId);
       let task=project.tasks.id(taskId);
       task.set(updatedTask);
       task.modifiedBy=currentUser._id;
       task.modifiedOn=new Date;
       project.modifiedOn = new Date;
       project.modifiedBy=currentUser._id;
       project.save();
       console.log(`Task with id: ${taskId} successfully updated`);
       return task;
   } catch (error) {
       console.log(error);
       throw error;
   }
}

exports.create=async(currentUser,projectId,newTaskDTO)=>{   
   
    const userId=currentUser._id;
   // const{errors, isValid}=taskValidator.validateNew(newTaskDTO);
   // if(!isValid)
   //      throw new Error(errors);
         
    const newTask = new Task(newTaskDTO);
    try {
        const project = await Project.findById(projectId);
        if(!project) 
            throw new Error(`Project with id: ${projectId} could not be found`);
        newTask.createdBy=userId;
        newTask.createdOn = new Date;
        newTask.modifiedOn = new Date;
        if(project.tasks.length ===0 && project.status==='Not-Started'  && newTask.status ==='Ongoing')
          project.changeStatus('Ongoing');
        project.tasks.push(newTask);
        project.modifiedOn=new Date;
        project.save();
        console.log('Task successfully added to project');
        return newTask;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.delete=async (currentUser,projectId,taskId)=>{
    const userId=currentUser._id;
    try {
        const project = await Project.findById(projectId);
        if(!project) 
           return false;
        const task=project.tasks.id(taskId);
        if(userId!==task.createdBy)
            throw new Error('Task can only be deleted by the creator')
        task.remove();
        project.modifiedOn=new Date;
        project.modifiedBy=userId;
        project.save();
        console.log(`Task with id: ${taskId} successfully deleted`);
        return true;
    } catch (error) {
        console.log(error);
        throw error;
    }

}

exports.addAssignedTo=async(currentUser,projectId,taskId,userId)=>{
    try {
        const project = await Project.findById(projectId);
        let task=project.tasks.id(taskId);
        const user=await userService.getUserById(userId);
        if(!user)
          throw new Error(`User with id: ${userId} does not exist in the system and could not be assigned to task`);

          //check that the task doesn't already have someone else assigned to it
        if(task.assignedTo !==null)
             throw new Error('Task is already assigned to someone else. Un-Assign and then Re-Assign');

        task.assignedTo=userId;
        task.modifiedBy=currentUser._id;
        task.modifiedOn = new Date;
        project.modifiedOn=new Date;
        project.modifiedBy=currentUser._id;
        project.save();
        console.log(`Task with id: ${taskId} successfully updated`);
         //some stuff here e.g. notifications and the like..//
        return task;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.removeAssignedTo=async(currentUser,projectId, taskId)=>{
   try {
    const project = await Project.findById(projectId);
    if(!project)
      throw new Error(`Project with id: ${projectId} not found`)
    //rules on who can modify a project
    let task=project.tasks.id(taskId);
    if(!task)
      throw new Error(`Task with id: ${taskId} not found in project with id: ${projectId}`);
    task.assignedTo=null;
    task.modifiedOn = new Date;
    task.modifiedBy=currentUser._id;
    project.modifiedOn= new Date;
    project.modifiedBy=currentUser._id;
    project.save();
    console.log('Task un-assigned successfully');
    //some stuff here maybe notifications
    return task;
    } catch (error) {
    console.log(error);
    throw error;
  }
   
}


exports.updateStatus=async(user,projectId, taskId,newStatus)=>{
    try{
        const project=await Project.findById(projectId);
        if(!project)
           throw new Error(`Project with Id: ${projectId} not found`); 
        let task=project.tasks.id(taskId);
         if(!task)
            throw new Error(`Task with id: ${taskId} not part of the project`);
        if(user._id !==task.createdBy || user._id!==assignedTo)
            throw new Error('Task status can only be modified by the Task creator or assignee');
        task.changeStatus(newStatus);
        task.setModifiedBy(user._id);
        task.modifiedOn=new Date;
        project.modifiedOn=new Date;
        project.save();
        //some status update logic will be applied here..// along with the code
        //that does notifications and stuff like that...
        return task;   
    }catch(error){
       console.log(error);
       throw error;
    }
}