
const Goal=require('./goal.model');
exports.getCount=async(user)=>{
    try{
        const count=await Goal.countDocuments({createdBy:user._id});
        return count;
    }catch(error){
        throw error;
    }
}

exports.getAll=async(user)=>{
     try{
         const goals=await Goal.find({createdBy:user._id})
                                .populate('createdBy','firstName lastName email image')
                                .populate('modifiedBy','firstName lastName email image');
         return goals;
     }catch(error){
         console.log(error);
         throw error;
     }
}

exports.getGoalById=async(user,goalId)=>{
    try{
        const goal=await Goal.find({_id:goalId})
                             .populate('createdBy','firstName lastName email image')
                             .populate('modifiedBy','firstName lastName email image');
        if(!goal)
            throw new Error(`Goal with id: ${goalId} does not exist!`);
        return goal;
    }catch(error){
        console.log(error);
        throw error;
    }
}

exports.create=async(user,goalDTO)=>{ 
    const newGoal = new Goal(goalDTO);
    newGoal.setCreatedBy(user._id);
    newGoal.setCreatedOn(new Date);
    try {
        const savedGoal=await newGoal.save();                                
        console.log(`Goal with id: ${savedGoal._id} successfully created`);
        return savedGoal;
    }catch(error){
        console.log(error);
        throw error;
    }
}

exports.update=async (user,goalId,updatedGoalDTO)=>{
    try{
        const savedGoal=await Goal.findById(goalId);
        if(!savedGoal)
          throw new Error('Goal to be updated could not be found');
        savedGoal.set(updatedGoalDTO);
        savedGoal.setModifiedBy(user._id);
        const updated=await savedGoal.save();
        console.log('Goal successfully updated');
        return updated;
    }catch(error){
        console.log(error);
        throw error;
    }
}

exports.delete=async(user,goalId)=>{
    //enforce some rules about who can delete the goal
    try{
        const goal=await Goal.findById(goalId);
        if(goal.createdBy !==user._id)
          throw new Error('Only the creator of the goal can delete it')
        await Goal.findByIdAndDelete(goalId);
        console.log(`Goal with id: ${goalId} successfully deleted`);
       return true;
    }catch(error){
        console.log(error);
        throw error;
    }
}

exports.updateStatus=async(user,goalId,newStatus)=>{
    try{
        const goal=await Goal.findById(goalId);
        goal.setModifiedBy(user._id);
        goal.changeStatus(newStatus);
        goal.save();
       return goal;
    }catch(error){
        console.log(error);
        throw error;
    }
}

