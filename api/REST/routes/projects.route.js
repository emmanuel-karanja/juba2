
const projectController=require('../controllers/projects.controller');
const auth=require('../middlewares/auth');
const config=require('../../../config');
const path=config.api.prefix+'/projects';
module.exports=(app)=>{
    app.route(path)
        .get(projectController.getAll)
        .post(projectController.create);

    app.route(path+'/:id')
        .get(projectController.getById)
        .put(projectController.update)
        .delete(projectController.delete);
    app.route(path+'/:id/full')
        .get(projectController.getAllFull);
};
