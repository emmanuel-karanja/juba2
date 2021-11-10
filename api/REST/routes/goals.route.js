
const goalController=require('../controllers/goal.controller');
const auth=require('../middlewares/auth');
const config=require('../../../config');

const path=config.api.prefix+'/goals';

module.exports=(app)=>{
    app.route(path)
        .get(auth.isAuth,goalController.getAll)
        .post(auth.isAuth,goalController.create);

    app.route(path+'/:id')
        .get(auth.isAuth,goalController.getById)
        .put(auth.isAuth,goalController.update)
        .delete(auth.isAuth,goalController.delete);
};
