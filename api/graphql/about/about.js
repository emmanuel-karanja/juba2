const {gql}=require('apollo-server-express');

const aboutSchema=gql `
extend type Query {
    about: About!
  }  
  
  type About {
    title: String
    description: String
  }
`
const aboutResolver={
    Query: {
        about: () => { 
         return { 
            title:"About Lil' Juba",
            description:"This is a simple graphQL server implementation. "+
            "It has a basic authentication and authorization module, A Basic "+
            " User Management API to view/create/update/delete users as well as a"+
            "simple Task(aka Goals here) Management API. To use it, you can run a userCreate"
            +" query from '/graphql' endpoint be sure to specify role as 'Admin' to be able "
            +"to create/view/update/delete other users. Once a user is"
            +"created, he/she can view/create/update/delete goals etc the API is self-explanatory "
            +".The auth module uses JWT and a local strategy. The JWT is expected within the request 'Authorization'  header"
            +" as 'Token/Bearer 'xxxxxxxx' a single space between Token/Bearer and token string('xxxxxxx')"}
        },
      }
}

module.exports={aboutSchema,aboutResolver};