const {taskSchema}=require('./task.schema');
const {taskResolver}=require('./task.resolver')
const {taskService}=require('./task.service');

module.exports={taskSchema,taskResolver,taskService};