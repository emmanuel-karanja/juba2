const Joi=require('joi');
const getErrorMessage=require('../../api/helpers/getErrorMessage');

function validateUpdate(user){
    const result=Joi.validate(user,editUserSchema,{ abortEarly: false });
    const{error}=result;
    const isValid= error==null;
    return{
        isValid,errors:error
    }
}

function validateNew(newUser){
    const result=Joi.validate(newUser,createUserSchema,{ abortEarly: false });
    const{error}=result;
    const isValid= error==null;
    return{
        isValid,errors:error
    }
}

const emailSchema=Joi.string().email().lowercase();
const nameSchema=Joi.string().min(2).max(100);
const passwordSchema=Joi.string().min(7).alphanum();

const createUserSchema=Joi.object().keys({
    email: emailSchema.required(),
    firstName: nameSchema.required(),
    lastName: nameSchema.required(),
    password: passwordSchema.required().strict(),
    confirmPassword: passwordSchema.valid(Joi.ref('password')).required().strict(),
    role: Joi.string().valid('Admin','PowerUser','User','Guest').optional(),
    image: Joi.string().optional(),
});

const editUserSchema=Joi.object().keys({
    email: emailSchema.required(),
    firstName: nameSchema.required(),
    lastName: nameSchema.required(),
    password: passwordSchema.required().strict(),
    role: Joi.string().valid('Admin','PowerUser','User','Guest').required(),
    image: Joi.string().optional(),
});

const changePasswordUserSchema=Joi.object().keys({
    email: emailSchema.required(),
    role: Joi.string().valid('Admin','PowerUser','User','Guest').required(),
    createdOn: Joi.date().iso().required(),
    password: passwordSchema.required().strict(),
    confirmPassword: passwordSchema.valid(Joi.ref('password')).required().strict()

});

module.exports={
    validateUpdate,
    validateNew
}