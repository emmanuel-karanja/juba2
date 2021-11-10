const authService=require('../../../core/auth/auth.service')

exports.isAuth=async(req,res,next)=>{
    const currentUser=await authService.getUser(req);
    if(currentUser){
      req.user=currentUser;
      next();//move to the next middleware
    }else{
      throw new Error('Authentication failed');
    }
  }

  exports.isAdmin=async(req,res,next)=>{
    if(req.user.role ==='Admin') {
        next();//passes
    }else{
        throw new Error('You must be logged in as Admin to perform this action');
    }
  }

  