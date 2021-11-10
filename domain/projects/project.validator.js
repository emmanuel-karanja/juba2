const Joi=require('joi');

function validateUpdate(project){
    //implement the update validation
    const result=Joi.validate(project,editProjectSchema,{ abortEarly: false });
    const{error}=result;
    const isValid= error==null;
    return{
        isValid,errors:error
    }
    
}

function validateNew(newProject){
    //validate task for creation
    const result=Joi.validate(newProject,createProjectSchema,{ abortEarly: false });
    const{error}=result;
    const isValid= error==null;
    return{
        isValid,errors:error
    }
}

const createProjectSchema=Joi.object().keys({
    title: Joi.string().min(5).required(),
    description: Joi.string().min(20).required(),
    status: Joi.string().valid('NotStarted','Ongoing','Suspended','Cancelled','Completed').required(),
});

const editProjectSchema=Joi.object().keys({
    title: Joi.string().min(5).required(),
    description: Joi.string().min(20).required(),
    status: Joi.string().valid('NotStarted','Ongoing','Suspended','Cancelled','Completed').required(),
});

module.exports={
   validateUpdate,validateNew,
}
