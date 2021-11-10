const config=require('../config');
const Agenda=require('agenda');
let configureMongoDBObj = {
    db: {
        address: config.databaseURL, 
        collection: 'jobs', 
        options:{
            useNewUrlParser: true ,
            useUnifiedTopology:true,
        }
    }
};

const agenda = new Agenda(configureMongoDBObj);

module.exports=agenda;