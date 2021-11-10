const {gql,makeExecutableSchema}=require('apollo-server-express');
const {mergeTypeDefs, mergeResolvers}=require('graphql-tools');
const {goalSchema,goalResolver}=require('./goals');
const {aboutSchema, aboutResolver}=require('./about/about');
const {userSchema, userResolver}=require('./users');
const {authSchema,authResolver}=require('../../core/auth');
const {projectSchema,projectResolver}=require('./projects');
const {taskSchema,taskResolver}=require('./tasks');

/**All the other modules will have their typedefs and resolvers loaded here */

const rootSchema=gql `
    type Query {
        _empty: String
      }
    type Mutation {  
        _empty: String  
      }`;

 const rootResolver={
    Query: {},
    Mutation: {},
 }

 const typeDefs = mergeTypeDefs([rootSchema,goalSchema,aboutSchema,userSchema,
               authSchema,projectSchema,taskSchema,]);
 const resolvers=mergeResolvers([rootResolver, goalResolver,aboutResolver,
              userResolver,authResolver,projectResolver,taskResolver,]);
 const schema=makeExecutableSchema({typeDefs,resolvers});
 
 module.exports={schema}