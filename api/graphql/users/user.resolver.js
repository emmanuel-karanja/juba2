
const users=require('./user.controller');
const {combineResolvers}=require('graphql-resolvers');
const {isAuthenticated}=require('../middleware/isAuth');
const {isAdmin}=require('../middleware/isAdmin');
//authorization resolvers are applied as middleware..others will be added depending on the business
//use cases and I suspect strongly that I'll need to change the form. It's rather verbose 
const apply=combineResolvers; //an alias for combineResolvers to make it easier to read
exports.userResolver = {
  Query: { 
    users:apply(isAuthenticated,isAdmin,users.getAll),
    userById:apply(isAuthenticated,users.getUserById),
    userByEmail:apply(isAuthenticated,users.getUserByEmail),
    userCount:apply(isAuthenticated,isAdmin,users.getCount),
  },
  Mutation: {
    userCreate:users.create,
    userUpdate:apply(isAuthenticated,users.update),
    userDelete: apply(isAuthenticated,isAdmin,users.delete),
    userActivate:apply(isAuthenticated,isAdmin,users.activate),
    userDeActivate:apply(isAuthenticated,isAdmin,users.deActivate),
    userBlock: apply(isAuthenticated,isAdmin,users.block),
    userUnBlock:apply(isAuthenticated,isAdmin,users.unBlock),
    userUpdateRole:apply(isAuthenticated,isAdmin,users.updateRole)
  },
};

