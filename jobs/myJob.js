const MY_JOB_NAME='myjobname';

const runJob=(args)=>{
    const {itemId}=args;
    console.log('args:',itemId);
}

module.exports={MY_JOB_NAME,runJob,}