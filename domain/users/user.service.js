const userValidator=require('./user.validator');
const User=require('./user.model');


exports.getCount=async()=>{
    try{
     const count=await User.countDocuments();
     return count;
    }catch(error){
        throw error;
    }
}

exports.getAll=async(filter)=>{
    try {
        //some sorting and filters and pagination
        const users = await User.find();
        //we don't want to return passwords and what nots
        const userProfiles=users.map(user=>user.toProfileUser());
        return userProfiles;
    }catch(error){
        console.log(error);
        throw error;
    }
}

exports.getUserById=async(userId)=>{
    try{
        const user=await User.findById(userId);
        if(!user)
            throw new Error(`User with id: ${userId} does not exist`);
        return user;
    }catch(error){
        console.log(error);
        throw error;
    }
}

exports.getUserByEmail=async(email)=>{
    try{
        const user=await User.findOne({email:email});
        if(!user)
            throw new Error(`User with email: ${email} does not exist`);
        return user;
    }catch(error){
        console.log(error);
        throw error;
    }
}

exports.create=async (newUserDTO)=>{     
    const{isValid, errors}=userValidator.validateNew(newUserDTO);
    if(!isValid)
       throw new Error(errors);
    const newUser = new User(newUserDTO);
    newUser.setPassword(newUserDTO.password);
    newUser.setLastLogin(new Date);
    try {
        const savedUser=await newUser.save();
        console.log(`New User with id: ${savedUser._id} successfully created`);
        return savedUser.authUser();
    }catch(error){
        console.log(error);
        throw error;
    }
}

exports.update=async (updatedUser)=>{  
    const{isValid, errors}=userValidator.validateUpdate(updatedUser);
    if(!isValid)
       throw new Error(errors);
    try{
        const savedUser=await User.findByIdAndUpdate(userId, userDTO);
        if(!savedUser)
          throw new Error('User could not be updated');
        console.log('User successfully updated');
        return savedUser.toProfileUser();
    }catch(error){
        console.log(error);
        throw error;
    }
}

exports.delete=async (userId)=>{
    try{
        await User.findByIdAndDelete(userId);
        console.log(`User with id: ${userId} successfully deleted`);
        return true;
    }catch(error){
        console.log(error);
        throw error;
    }
}

exports.activate=async(userId)=>{
    try{
        const user=await User.findById(userId);
        if(!user) 
          throw new Error('User does not exist');
        user.activate();
        user.save();
        return user.toProfileUser();
    }catch(error){
     console.log(error);
     throw error;
    }
}

exports.deActivate=async(userId)=>{
    try{
        const user=await User.findById(userId);
        if(!user) 
          throw new Error('User does not exist');
        user.deActivate();
        user.save();
        return user.toProfileUser();
    }catch(error){
     console.log(error);
     throw error;
    }
}

exports.block=async(userId)=>{
    try{
        const user=await User.findById(userId);
        if(!user) 
          throw new Error('User does not exist');
        user.block();
        user.save();
        return user.toProfileUser();
    }catch(error){
     console.log(error);
     throw error;
    }
}

exports.unBlock=async(userId)=>{
    try{
        const user=await User.findById(userId);
        if(!user) 
          throw new Error('User does not exist');
        user.unBlock();
        user.save();
        return user.toProfileUser();
    }catch(error){
     console.log(error);
     throw error;
    }
}

exports.updateRole=async(userId,newRole)=>{
    try{
        const user=await User.findById(userId);
        if(!user) 
          throw new Error('User does not exist');
        //execute some stuff that goes with role change. Perhaps some business rules.
        user.updateRole(newRole);
        user.save();
        return user.toProfileUser();
    }catch(error){
     console.log(error);
     throw error;
    }
}

