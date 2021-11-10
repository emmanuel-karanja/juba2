const agenda=require('./agenda');
const exampleJob=require('../jobs/exampleJob');

const setupJobs=async()=>{
   
    exampleJob.defineJob(agenda);

    await agenda.start();

    //example
    exampleJob.scheduleJob(agenda,123456)

}

module.exports={setupJobs,}