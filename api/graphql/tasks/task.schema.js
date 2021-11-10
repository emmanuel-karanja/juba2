const {gql}=require('apollo-server-express');

const taskSchema= gql`
scalar GraphQLDate
  
  type Task {
    _id: ID!
    title: String!
    description: String!
    status:StatusType!
    createdOn: String!
    modifiedOn:String
    createdBy: UserParty!
    modifiedBy:UserParty
    assignedTo: UserParty
    due: String
  }

  
  input NewTaskInput {
    title: String!
    description: String!
    status:StatusType=New
    due:GraphQLDate
  }
  
  input UpdateTaskInput {
    title: String
    description:String
    status: StatusType
    due: GraphQLDate
  }

  extend type Query { 
    tasks(projectId: ID!): [Task!]!
    task(taskId: ID!): Task
    taskCount(projectId:ID!):Int!
    createdBy:UserParty!
    modifiedBy:UserParty
    assignedTo:UserParty
  }
  
  extend type Mutation {
    taskCreate(projectId:ID!,newTask:NewTaskInput!): Task!
    taskUpdate(projectId:ID!,taskId:ID!, updatedTask: UpdateTaskInput!): Task!
    taskDelete(projectId:ID!,taskId: ID!): Boolean!
    taskUpdateStatus(projectId:ID!,taskId:ID!,newStatus:StatusType!): Task! 
    taskAssign(projectId:ID!, taskId:ID!, assignToId:ID!): Task!
    taskUnAssign(projectId:ID!, taskId:ID!):Boolean!
  }`;

  
module.exports={taskSchema};