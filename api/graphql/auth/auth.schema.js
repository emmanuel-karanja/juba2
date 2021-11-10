const {gql}=require('apollo-server-express');

const authSchema= gql`
 type AuthUser {
    _id: ID!
    firstName: String!
    lastName: String!
    email:String!
    image:String!
    token:String!
    role: String!
    loggedIn:Boolean!
  }

  input AuthUserInput{
      email: String!
      password:String!
  }

  extend type Query{
      login(credentials:AuthUserInput!): AuthUser!
      me:AuthUser
  }  
`
module.exports={authSchema}