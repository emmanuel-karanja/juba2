
const tasks=require('./task.controller')
//you have to export the resolver this way otherwise it won't work.
const GraphQLDate=require('../GraphQLDateScalar');
const {combineResolvers}=require('graphql-resolvers');
const {isAuthenticated}=require('../middleware/isAuth');
const apply=combineResolvers;
exports.taskResolver = {
  Query: { 
    tasks:apply(isAuthenticated,tasks.getAll),
    task: apply(isAuthenticated,tasks.getTaskById),
    taskCount:apply(isAuthenticated,tasks.getCount),
    createdBy:tasks.getCreatedBy,
    modifiedBy:tasks.getModifiedBy,
    assignedTo: tasks.getAssignedTo,
  },
  Mutation: {
    taskCreate:apply(isAuthenticated,tasks.create),
    taskUpdate:apply(isAuthenticated,tasks.update),
    taskDelete: apply(isAuthenticated,tasks.deleteTask),
    taskUpdateStatus:apply(isAuthenticated,tasks.updateStatus),
    taskAssign:apply(isAuthenticated,tasks.assignTo),
    taskUnAssign: apply(isAuthenticated, tasks.unAssign),
  },
  GraphQLDate,
};

