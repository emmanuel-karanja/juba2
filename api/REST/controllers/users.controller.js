//each controller obtains the currentUser from the request object and performs authorization checks
//authorization will be done at the routes level, the controller simply unpacks the user
//and some of the params and performs the service call
//the purpose of the controller is so that the req,res objects don't polute the service layer
const userService=require('../../../domain/users/user.service');

exports.getAll=(req,res)=>{

}
exports.getUserById=(req,res,next,userId)=>{
    try{
        const user = await userService.getUserById(userId);
        req.user=user.toProfileUser();
        next();
    }catch(error){
        console.log(error);
        res.status(404).json({error:error});
    }
}

exports.getById=(req,res)=>{
    return req.user;
}

exports.create=(req,res)=>{

}

exports.delete=(req,res)=>{
   const user=req.user;
   try{
     await userService.delete(user._id);
     res.status(200).json({message: `User with id ${user._id} successfully deleted`});
   }catch(error){
       console.log(error);
       res.status(500).json({error:error});
   }
}

exports.update=(req,res)=>{
  const user=req.user;
  try{

  }catch(error){
    console.log(error);
    res.status(500).json({error:error});
  }
}