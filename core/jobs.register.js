const agenda=require('../loaders/agenda');
const myJob=require('../jobs/myJob');

class Register {
    constructor() {
        this.run()
            .catch(error => {
                console.error(error)
            });
    }

    async run() {
        console.log('called jobRegister.run')
        try {
            agenda.define(myJob.MY_JOB_NAME, (job, done) => {
                myJob.runJob(job.attrs.data);
                done();
            });

            console.log('job registered..')
            /*agenda.define('JOB_PROCESS_FETCH_RSS_AUTOPOSTS', (job, done) => {
                new FetchAutoPostWorkFlow(job.attrs);
                done();
            });*/

            //await new Promise(resolve => agenda.once('ready', resolve));
            await agenda.start();

        } catch (error) {
            console.log(error)
        }
    }
}
module.exports = Register;