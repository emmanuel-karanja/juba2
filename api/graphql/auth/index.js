const {authSchema}=require('./auth.schema');
const {authResolver}=require('./auth.resolver');
const {authService}=require('../../../core/auth/auth.service');

module.exports={authSchema,authResolver,authService}