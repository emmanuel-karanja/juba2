const {gql}=require('apollo-server-express');

const projectSchema= gql`
scalar GraphQLDate
enum StatusType {
    Ongoing
    NotStarted
    Completed
    Suspended
    Cancelled
  }
  
  type UserParty{
    _id:ID!
    fullName:String
    email:String
    image:String
  }

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

  type Project {
    _id: ID!
    title: String!
    description: String!
    status:StatusType!
    createdOn: String!
    modifiedOn:String
    createdBy: UserParty!
    modifiedBy:UserParty
    contributors:[UserParty]
    tasks: [Task]
    due: String
  }

  
  input NewProjectInput {
    title: String!
    description: String!
    status:StatusType=New
    due:GraphQLDate
  }
  
  input UpdateProjectInput {
    title: String
    description:String
    status: StatusType
    due: GraphQLDate
  }

  extend type Query { 
    projects: [Project!]!
    project(projectId:ID!): Project!
    projectCount:Int!
    projectCreatedBy:UserParty!
    projectModifiedBy:UserParty
    projectContributors:[UserParty]
    projectTasks:[Task]
  }
  
  extend type Mutation {
    projectCreate(newProject:NewProjectInput): Project!
    projectUpdate(projectId: ID!, updatedProject: UpdateProjectInput!): Project!
    projectDelete(projectId: ID!): Boolean!
    projectUpdateStatus(projectId:ID!,newStatus:StatusType!): Project! 
    projectAddContributor(projectId:ID!,contributorId:ID!):Project!
    projectRemoveContributor(projectId:ID!,contributorId:ID!): Boolean!
  }`;

  
module.exports={projectSchema};