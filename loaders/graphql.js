const config=require('../config');
const { ApolloServer} = require('apollo-server-express');
const {schema}=require('../api/graphql');

const {getUser}=require('../core/auth/auth.service');

const getContext=async({req})=>{
  const currentUser=await getUser(req);
  if(!currentUser)
     return null;
  return currentUser;
  //there will be other context objects that will be obtained similarly and the
  //context object will contain many things e.g. pubSub,dataSource, currentUser, etc

  /**getContext(){}
   * ..do some stuff here..
   * return {
   *    currentUser:getCurrentUser,
   *    dataSource: dataSource,
   *    models: getModels,
   *    otherContextPiece: getOtherContextPcs,
   *  }
   * }
   */
}

const server = new ApolloServer({
  schema,
  context:getContext,
  formatError: (error) => {
    console.log(error);
    return error;
  },
  playground: true,
  introspection: true,
});

const enableCors=config.cors.enableCors;
const graphqlEndpoint=config.api.graphQLEndpoint;
let cors;
if(enableCors){
  const origin=config.cors.allowedOrigin;
  const method='POST';
  cors={origin,method,credentials:true};
}else{
  cors='false';
}

function setupGraphQLHandler(app) {
  server.applyMiddleware({ app, path: graphqlEndpoint,cors});
}

module.exports = { setupGraphQLHandler };
