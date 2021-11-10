const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');


const TaskSchema = new mongoose.Schema({
    title: {type:String, required: [true, "can't be blank"]  },
    description:{type: String, required: [true, "can't be blank"]},
    status:{
        type: String,
        enum: ['NotStarted','Ongoing','Completed','Suspended','Cancelled'],
        required:true
      },
    timer: {type: Number, default: 0.00},
    assignedTo:{type: Schema.Types.ObjectId, ref: 'User'},
    createdOn: { type: Date, default: Date.now},
    createdBy:{type: mongoose.Schema.Types.ObjectId,ref: 'User'},
    modifiedBy:{type: mongoose.Schema.Types.ObjectId,ref: 'User'},
    modifiedOn:Date,
    deadline: {type: Date,}
});

TaskSchema.plugin(uniqueValidator, {message: 'is already taken'});

TaskSchema.methods.toProfileTask=function(){
    return{
        _id:this._id,
        title:this.title,
        description:this.description,
        status: this.status,
        assignedTo: this.assignedTo,
        deadline: this.deadline,
        timer: this.timer
    }
}

TaskSchema.methods.changeStatus=function(newStatus){
    this.status=newStatus;
}

TaskSchema.methods.setModifiedBy=function(modifiedBy){
    this.modifiedBy=modifiedBy;
}


const Task=mongoose.model('Task',TaskSchema)
module.exports={Task, TaskSchema};
