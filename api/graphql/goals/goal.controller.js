const  goalService=require('../../../domain/goals/goal.service');
/**01.06.2020 at 10:50hrs
 * this is the shape of every resolver and as you can see, purpose of each is to unpack
 * the args and pass required fields to the services
 */

const getAll=async(parent,args,{currentUser})=>{ 
    try{
     const allGoals=await goalService.getAll(currentUser);
     return allGoals;
    }catch(error){
     throw error;
    }
}

const getGoalById=async(parent,args,{currentUser})=>{  
    const {id}=args;
    console.log('goalId:',id)
    try{
      const goal=await goalService.getGoalById(currentUser,id);
      console.log('returned goal:',goal);
      return goal;
    }catch(error){
    throw error;
    }
}

const create=async(parent,args,{currentUser})=>{
    const {newGoal}=args;
    try{
     const savedGoal=await goalService.create(currentUser,newGoal);
     return savedGoal;
    }catch(error){
    throw error;
    }
}

const update=async(parent,args,{currentUser})=>{
    const {updatedGoal, id}=args;
    try{
    const savedGoal=await goalService.update(currentUser,id, updatedGoal);
    return savedGoal;
    }catch(error){
     throw error;
    }
}

const deleteGoal=async(parent,args,{currentUser})=>{
    const{id}=args;
    try{
    const results=await goalService.delete(currentUser,id);
    return results;
    }catch(error){
     throw error;
    }
}

const getCount=async(parent,args,{currentUser})=>{  
      try{
       const counts=await goalService.getCount(currentUser);
       return counts;
      }catch(error){
       throw error;
      }
}

const updateStatus=async(parent,args,{currentUser})=>{
    const{id, newStatus}=args;
      try{
      const updatedGoal=await goalService.updateStatus(currentUser,id, newStatus);
      return updatedGoal;
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

module.exports={
    create,update,deleteGoal,getGoalById,getAll,getCount,updateStatus,getCreatedBy,getModifiedBy
}