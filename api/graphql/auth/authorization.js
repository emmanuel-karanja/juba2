//12.06.2020 st 09:21hrs each resolver is wrapped in this function for basic authentication
//a near future version will use resolver middleware for authentication and authorization.
const { AuthenticationError } = require('apollo-server-express');
exports.secure=(resolver)=> {
    return (parent, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('You must be signed in');
      }
      return resolver(parent, args, { currentUser });
    };
  }
  
  exports.secureAdminOnly=(resolver)=>{
    return(parent,args,{currentUser})=>{
      if(currentUser && currentUser.role==='Admin' ){
         return resolver(parent,args,{currentUser});
      }
      throw new AuthenticationError('Only users with Admin privileges allowed access');
    }
  }

  