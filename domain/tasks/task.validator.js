const Joi=require('joi');

function validateUpdate(task){
    const result=Joi.validate(task,editTaskSchema,{ abortEarly: false });
    const{error}=result;
    const isValid= error==null;
    return{
        isValid,errors:error
    }
}

function validateNew(newTask){
    const result=Joi.validate(newTask,createTaskSchema,{ abortEarly: false });
    const{error}=result;
    const isValid= error==null;
    return{
        isValid,errors:error
    }
}

const taskNameSchema=Joi.string().min(5);
const taskDescSchema=Joi.string().min(10);
const statusSchema=Joi.string().valid('NotStarted','Ongoing','Suspended','Cancelled','Completed');
const createdBySchema=Joi.string();

const createTaskSchema=Joi.object().keys({
    title: taskNameSchema.required(),
    description: taskDescSchema.required(),
    status: statusSchema.required(),
});

const editTaskSchema=Joi.object().keys({
    taskName: taskNameSchema.required(),
    taskDesc: taskDescSchema.required(),
    status: statusSchema.required(),

});



module.exports={
   validateUpdate,validateNew
}


