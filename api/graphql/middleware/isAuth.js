const {skip}=require('graphql-resolvers');
const {AuthenticationError}=require('apollo-server-express');

exports.isAuthenticated=(parent,args, {currentUser})=> {
    return currentUser ? skip : new AuthenticationError('You must be logged in');
  }