const  taskService=require('../../../domain/tasks/task.service');
/**01.06.2020 at 10:50hrs
 * this is the shape of every resolver and as you can see, purpose of each is to unpack
 * the args and pass required fields to the services
 */

const getAll=async(parent,args)=>{ 
    const{projectId}=args;
    try{
     const allTasks=await taskService.getAll(projectId);
     return allTasks;
    }catch(error){
     throw error;
    }
}

const getTaskById=async(parent,args)=>{  
    const {taskId,projectId}=args;
    try{
      const Task=await TaskService.getTaskById(projectId,taskId);
      console.log('returned Task:',Task);
      return Task;
    }catch(error){
    throw error;
    }
}

const create=async(parent,args,{currentUser})=>{
    const {newTask,projectId}=args;
    console.log('args:',args)
    try{
     const savedTask=await taskService.create(currentUser,projectId,newTask);
     return savedTask;
    }catch(error){
    throw error;
    }
}

const update=async(parent,args,{currentUser})=>{
    const {updatedTask, projectId, taskId}=args;
    try{
    const savedTask=await taskService.update(currentUser,projectId,taskId, updatedTask);
    return savedTask;
    }catch(error){
     throw error;
    }
}

const deleteTask=async(parent,args,{currentUser})=>{
    const{projectId, taskId}=args;
    try{
    const results=await taskService.delete(currentUser,projectId,taskId);
    return results;
    }catch(error){
     throw error;
    }
}

const getCount=async(parent,args)=>{  
    const {projectId}=args;
      try{
       const taskCount=await taskService.getCount(projectId);
       return taskCount;
      }catch(error){
       throw error;
      }
}

const updateStatus=async(parent,args,{currentUser})=>{
    const{projectId,taskId,newStatus}=args;
      try{
      const updatedTask=await TaskService.updateStatus(currentUser,projectId,taskId,newStatus);
      return updatedTask;
      }catch(error){
       throw error;
      }
}

const assignTo=async(parent, args,{currentUser})=>{
    const {projectId,taskId}=args;
   try{

     const assignedTask=await taskService.addAssignedTo(currentUser,projectId,taskId);
     return assignedTask;
   }catch(error){
       throw error;
   }
}

const unAssign=async(parent,args,{currentUser})=>{
    const{projectId, taskId}=args;
    try{
     const result=await taskService.removeAssignedTo(currentUser,projectId, taskId);
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

const getAssignedTo=async(parent)=>{
    if(parent.assignedTo){
        return {
            fullName: parent.assignedTo.firstName+' '+parent.assignedTo.lastName,
            email: parent.assignedTo.email,
            _id: parent.assignedTo._id,
        }
    }else{
        return null;
    }
}
module.exports={
    create,update,deleteTask,getTaskById,getAll,getCount,updateStatus,getCreatedBy,
    getModifiedBy,assignTo,unAssign,getAssignedTo
}