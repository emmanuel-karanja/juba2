
const goals=require('./goal.controller')
//you have to export the resolver this way otherwise it won't work.
const GraphQLDate=require('../GraphQLDateScalar');
const {combineResolvers}=require('graphql-resolvers');
const {isAuthenticated}=require('../middleware/isAuth');
const apply=combineResolvers;
exports.goalResolver = {
  Query: { 
    goals:apply(isAuthenticated,goals.getAll),
    goal: apply(isAuthenticated,goals.getGoalById),
    goalCount:apply(isAuthenticated,goals.getCount),
    goalCreatedBy:goals.getCreatedBy,
    goalModifiedBy:goals.getModifiedBy,
  },
  Mutation: {
    goalCreate:apply(isAuthenticated,goals.create),
    goalUpdate:apply(isAuthenticated,goals.update),
    goalDelete: apply(isAuthenticated,goals.deleteGoal),
    goalUpdateStatus:apply(isAuthenticated,goals.updateStatus),
   
  },
  GraphQLDate,
};

