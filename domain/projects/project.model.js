const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const {TaskSchema}=require('../tasks/task.model');
const uniqueValidator = require('mongoose-unique-validator');

const ProjectSchema = new Schema({
    title: {type: String,unique: true, required: [true,"can't be blank"]},
    description: {type:String, required: [true, "can't be blank"]},
    status:{
        type: String,
        enum: ['NotStarted','Ongoing','Completed','Suspended','Cancelled'],
        required:true
      },
    deadline:{type: Date},
    contributors: [ {type: Schema.Types.ObjectId,  ref: 'User'} ],
    tasks:[TaskSchema],
    createdOn: { type: Date, default: Date.now},
    createdBy:{type: Schema.Types.ObjectId,ref: 'User'},
    modifiedBy:{type:Schema.Types.ObjectId,ref: 'User'},
    modifiedOn:Date,
    icon: String,
});
ProjectSchema.plugin(uniqueValidator, {message: 'is already taken.'});

ProjectSchema.methods.toProfileProject=function(){
    return{
        _id: this._id,
        title: this.title,
        description: this.description,
        status: this.status,
        createdBy: this.createdBy,
        deadline: this.deadline,
        icon: this.icon || 'https://static.productionready.io/images/smiley-cyrus.jpg',
        tasksCount: this.tasks.length
    }
}

ProjectSchema.methods.changeStatus=function(newStatus){
    this.status=newStatus;
}



ProjectSchema.methods.isStarted=function(){
    if(this.status ==='Not-Started')
      return false;
    //else
    return true;
}

ProjectSchema.methods.isCompleted=function(){
    if(this.status ==='Completed')
      return true;
    //else
    return false;
}

ProjectSchema.methods.isCancelled=function(){
    if(this.status==='Cancelled')
       return true;
       //else
    return false;
}

ProjectSchema.methods.addContributor=function(contributorId){
    this.contributors.push(contributorId);
}

ProjectSchema.methods.removeContributor=function(contributorId){
    this.contributors.remove(contributorId);
}



const Project=mongoose.model('Project',ProjectSchema);
module.exports=Project;
