const EXAMPLE_JOB="exampleJobName";

function defineJob(agenda){
    console.log(`Defining ${EXAMPLE_JOB} job`);
    agenda.define(EXAMPLE_JOB, jobFunction);
}

const jobFunction=async(job, done)=>{
   const {itemId}=job.attrs.data;
   console.log('job.attribs',itemId);
   done();
}

const scheduleJob=async(agenda,itemId)=>{
    let job=agenda.create(EXAMPLE_JOB,{itemId});
    job.schedule('20 seconds');
    job.unique({'data.itemId': 'itemId'});
    try{
        await job.save();
        console.log(`Job ${EXAMPLE_JOB} successfully saved for item ${itemId}`);
    }catch(error){
        console.log('Job save failed', error);
    }
}

module.exports={
    EXAMPLE_JOB,
    defineJob,
    scheduleJob,
}