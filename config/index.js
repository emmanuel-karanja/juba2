const dotenv =require('dotenv');

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (envFound.error) {
  // This error should crash whole process
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

module.exports={
  
 //your fav port
  port: parseInt(process.env.PORT, 10),

  //mongo db url--the local or the long string from mLab.
  databaseURL: process.env.MONGODB_URI,

  //CORS
  cors:{
   enableCors: process.env.ENABLE_CORS,
   allowedOrigin:process.env.ALLOWED_ORIGIN,
  },
  
  jwtSecret: process.env.JWT_SECRET,

  agendaUri:process.env.AGENDA_MONGODB_URI,

  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },

  //agenda configs
  /*agenda: {
    dbCollection: process.env.AGENDA_DB_COLLECTION,
    pooltime: process.env.AGENDA_POOL_TIME,
    concurrency: parseInt(process.env.AGENDA_CONCURRENCY, 10),
  },


  //agendash configs
  /*agendash: {
    user: 'agendash',
    password: '123456'
  },
  //API configs*/
  api: {
    prefix: process.env.REST_API_PREFIX,
    graphQLEndpoint: process.env.GRAPHQL_ENDPOINT,
  },
  //mailer configs
  /*emails: {
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN
  }*/
};
