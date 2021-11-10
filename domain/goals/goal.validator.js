const Joi =require('joi');

exports.validateNew=(goal)=>{
    const result=Joi.validate(goal,createGoalSchema,{ abortEarly: false });
    const{error}=result;
    const isValid= error==null;
    return{
        isValid,errors:error
    }
}

exports.validateUpdate=(goal)=>{
    const result=Joi.validate(goal,editGoalSchema,{ abortEarly: false });
    const{error}=result;
    const isValid= error==null;
    return{
        isValid,errors:error
    }
}


const createGoalSchema=Joi.object().keys({
    title: Joi.string().min(5).max(50).required(),
    description: Joi.string().min(5).required(),
    status: Joi.string().valid('NotStarted','Ongoing','Completed','Suspended','Cancelled').optional(),
    createdBy: Joi.string().required()
});

const editGoalSchema=Joi.object().keys({
    title: Joi.string().min(3).max(50).optional(),
    description: Joi.string().min(10).optional(),
    status: Joi.string().valid('NotStarted','Ongoing','Completed','Suspended','Cancelled').optional(),
    modifiedBy:Joi.string().required()
});