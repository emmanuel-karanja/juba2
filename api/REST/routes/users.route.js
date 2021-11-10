
const userController=require('../controllers/users.controller');
const auth=require('../middlewares/auth');
const config=require('../../../config');
const path=config.api.prefix+'/users';
module.exports=(app)=>{
    app.param('userId',userController.gerUserById);
    app.route(path)
        .get(userController.list)
        .post(userController.create);

    app.route(path+'/:id')
        .get(userController.getUserById)
        .put(userController.update)
        .delete(userController.delete);
};