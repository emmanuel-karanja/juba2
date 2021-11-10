const {skip} =require('graphql-resolvers');
const {ForbiddenError}=require('apollo-server-express')

exports.isAdmin=(parent,args,{currentUser})=>{
    return (currentUser && currentUser.role==='Admin') ? skip 
            : new ForbiddenError('You must be logged in as Admin to access this resource');
}