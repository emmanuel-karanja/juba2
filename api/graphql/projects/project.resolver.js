
const projects=require('./project.controller')
//you have to export the resolver this way otherwise it won't work.
const GraphQLDate=require('../GraphQLDateScalar');
const {combineResolvers}=require('graphql-resolvers');
const {isAuthenticated}=require('../middleware/isAuth');
const apply=combineResolvers;
exports.projectResolver = {
  Query: { 
    projects:apply(isAuthenticated,projects.getAll),
    project: apply(isAuthenticated,projects.getProjectById),
    projectCount:apply(isAuthenticated,projects.getCount),
    projectCreatedBy:projects.getCreatedBy,
    projectModifiedBy:projects.getModifiedBy,
    projectContributors: projects.getContributors,
    projectTasks: projects.getTasks,
  },
  Mutation: {
    projectCreate:apply(isAuthenticated,projects.create),
    projectUpdate:apply(isAuthenticated,projects.update),
    projectDelete: apply(isAuthenticated,projects.deleteProject),
    projectUpdateStatus:apply(isAuthenticated,projects.updateStatus),
    projectAddContributor: apply(isAuthenticated, projects.addContributor),
    projectRemoveContributor:apply(isAuthenticated,projects.removeContributor),
  },
  GraphQLDate,
};

