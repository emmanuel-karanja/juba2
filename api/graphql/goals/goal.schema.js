const {gql}=require('apollo-server-express');

const goalSchema= gql`
scalar GraphQLDate
  type Goal {
    _id: ID!
    title: String!
    description: String!
    status:StatusType!
    createdOn: String!
    modifiedOn:String
    createdBy: UserParty!
    modifiedBy:UserParty
    due: String
  }

  
  input NewGoalInput {
    title: String!
    description: String!
    status:StatusType=New
    due:GraphQLDate
  }
  
  input UpdateGoalInput {
    title: String
    description:String
    status: StatusType
    due: GraphQLDate
  }

  extend type Query { 
    goals: [Goal!]!
    goal(id: ID!): Goal
    goalCount:Int!
    goalCreatedBy:UserParty!
    goalModifiedBy:UserParty
  }
  
  extend type Mutation {
    goalCreate(newGoal:NewGoalInput): Goal!
    goalUpdate(id: ID!, updatedGoal: UpdateGoalInput!): Goal!
    goalDelete(id: ID!): Boolean!
    goalUpdateStatus(id:ID!,newStatus:StatusType): Goal! 
  }`;

  
module.exports={goalSchema};