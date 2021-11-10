const {gql}=require('apollo-server-express');

const userSchema= gql`
enum RoleType {
    Admin
    PowerUser
    User   
    Guest
  }
  
  type AuthUser {
    _id: ID!
    fullName:String!
    email:String!
    image:String!
    token:String!
    active:Boolean!
  }

  type UserProfile{
      _id:ID!
      fullName:String!
      email:String!
      role: RoleType!
      active:Boolean!
      blocked:Boolean!
      image:String!
      lastLogin:String
  }

  input NewUserInput {
    firstName: String!
    lastName: String!
    email:String!
    password:String!
    confirmPassword:String!
    role:RoleType!
  }
  
  input UpdateUserInput {
    _id:ID!
    firstName: String
    lastName:String
    role: RoleType=User
    image:String
    active:Boolean
    blocked:Boolean
  }

  extend type Query { 
    users: [UserProfile!]!
    userById(id: ID!): UserProfile!
    userByEmail(email:String!):UserProfile!
    userCount:Int!
  }
  
  extend type Mutation {
    userCreate(newUser:NewUserInput): AuthUser!
    userUpdate(id: ID!, updatedUser: UpdateUserInput!): UserProfile!
    userDelete(id: ID!): Boolean!
    userActivate(id:ID!): UserProfile!
    userDeActivate(id:ID!):UserProfile!
    userBlock(id:ID!):UserProfile!
    userUnBlock(id:ID!):UserProfile!
    userUpdateRole(id:ID!,newRole:RoleType!):UserProfile!
  }`;

  
module.exports={userSchema};