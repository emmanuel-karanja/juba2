const config=require('../config');
const  express = require('express'),
    morgan=require('morgan'),
    bodyParser=require('body-parser'),
    methodOverride=require('method-override'),
    path=require('path'),
    helmet=require('helmet');


const expressPlayground= require('graphql-playground-middleware-express').default;

const Logger=require('./logger');
//const Register=require('../core/jobs.register');
const {setupRestRoutes}=require('../api/REST');

const agenda=require('./agenda');
const Agendash=require('agendash');
const {setupJobs}=require('./jobs');
const errorHandler=require('../api/helpers/errorHandler');
const cors=require('cors');

const graphQLEndpoint=config.api.graphQLEndpoint;
const environment=process.env.NODE_ENV;
const allowedOrigin=config.cors.allowedOrigin;

function setupLogger(app){
    if(environment==='development')
      app.use(morgan());
}

function setupAgendash(app){
  //agendash UI config
  app.use('/dash', Agendash(agenda));
}

function setupCors(app) {
  app.use(cors());
  app.all('/', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', allowedOrigin);
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    next();
  });
}

function setupBodyParser(app) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
}

function setupSecurity(app) {
  app.use(helmet());
  app.disable('x-powered-by');
}

function setupRoutes(app) {
  //health-check endpoint
  app.use('/ping', (req, res) => {
    res.status(200).end();
  });
  //setup REST routes
  setupRestRoutes(app);
  app.get('/playground', expressPlayground({ endpoint: graphQLEndpoint }));
}

function setupHandlers(app) {
  app.use(errorHandler)
  //app.use(notFoundHandler)
}


function createExpressApp() {
  const app = express();
  app.use(methodOverride());
  app.use(express.static(path.join(__dirname, 'public')));
  setupLogger(app);
  setupCors(app);
  setupBodyParser(app);
  setupSecurity(app);
  setupRoutes(app);
  setupJobs(app);
  setupAgendash(app);
  setupHandlers(app);
  return app;
}

module.exports={createExpressApp};



