
const userService=require('../../../domain/users/user.service');

exports.getCount=async(parent,args)=>{
    try{
    const count=await userService.getCount();
    return count;
    }catch(error){
        throw error;
    }
}

exports.getAll=async(parent,args, {currentUser})=>{
    try {
        //some sorting and filters and pagination
        const users = await userService.getAll();
        //we don't want to return passwords and what nots
        return users;
    }catch(error){
        console.log(error);
        throw error;
    }
}

exports.getUserById=async(parent,{id})=>{
    try{
        const user=await userService.getUserById(id);    
        return user;
    }catch(error){
        console.log(error);
        throw error;
    }
}
exports.getUserByEmail=async(parent,{email})=>{
   // const {email}=args;
    try{
        const user=await userService.getUserByEmail(email);     
        return user;
    }catch(error){
        console.log(error);
        throw error;
    }
}

exports.update=async (parent,args)=>{
    const {userId,updatedUser}=args
    try{
        const savedUser=await userService.update(userId, updatedUser);
        return savedUser;
    }catch(error){
        console.log(error);
        throw error;
    }
}

exports.create=async (parent,args)=>{
    const {newUser}=args;
    try {
        const createdUser=await userService.create(newUser);
        return createdUser;
    }catch(error){
        console.log(error);
        throw error;
    }
}

exports.delete=async (parent,{id})=>{
    try{
        await userService.delete(id);
        console.log(`User with id: ${id} successfully deleted`);
        return true;
    }catch(error){
        console.log(error);
        throw error;
    }
}

exports.activate=async(parent,{id})=>{
    try{
        const user=await userService.activate(id);
        return user;
    }catch(error){
     console.log(error);
     throw error;
    }
}

exports.deActivate=async(parent,{id})=>{
    try{
        const user=await userService.deActivate(id);
        return user;
    }catch(error){
     console.log(error);
     throw error;
    }
}

exports.block=async(parent,{id})=>{
    try{
        const user=await userService.block(id);        
        return user;
    }catch(error){
     console.log(error);
     throw error;
    }
}

exports.unBlock=async(parent,{id})=>{
    try{
        const user=await userService.unBlock(id);
        return user;
    }catch(error){
     console.log(error);
     throw error;
    }
}

exports.updateRole=async(parent,{id, newRole})=>{
    try{
        const user=await userService.updateRole(id,newRole);
        return user;
    }catch(error){
        throw error;
    }
}


