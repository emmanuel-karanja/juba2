
const taskController=require('../controllers/tasks.controller');
const auth=require('../middlewares/auth');
const config=require('../../../config');
const path=config.api.prefix+'/projects';
module.exports=(app)=>{
    app.param('projectId',taskController.getProject);
    //what it does is load the project into the request object//
    app.route(path+'/:projectId/tasks')
        .get(taskController.getAll)
        .post(taskController.create);

    app.route(path+'/:projectId/tasks/:taskId')
        .get(taskController.getById)
        .put(taskController.update)
        .delete(taskController.delete);
};
