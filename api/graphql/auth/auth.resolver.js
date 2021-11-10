const {userService}=require('../../../domain/users/user.service');
const {resolveUser}=require('../../../core/auth/auth.service');
const {AuthenticationError}=require('apollo-server-express');
exports.authResolver={
    Query:{
        login:async (parent,args)=>{
            //for the time being, the email and password are passed via the query,
            //in future, they'll be passed via the request object body
            //when I implement the authentication route--which will happen when I implement
            // the front-end
            const {email,password}=args.credentials;
            try{
              const user=await userService.getUserByEmail(email);
              if(!user)
                throw new AuthenticationError('Authentication failed! User not found!');
              if(!user.isActive())
                throw new AuthenticationError('User has been deactivated, please contact Admin');
              //the user document performs the authentication
              if(user.authenticate(password)){
                 user.setLastLogin(new Date);
                 user.save();
                 //the JWT generation is handled automatically by the user document
                 const userProfile=user.authUser();
                  return {...userProfile,loggedIn:true}
              }else{
                  throw new AuthenticationError('Authentication failed, password incorrect!');
              }
            }catch(error){
               console.log(error);
               throw error;
            }
        },
      me: resolveUser
    }
}