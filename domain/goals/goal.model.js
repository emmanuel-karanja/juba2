require('dotenv').config();
const mongoose=require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const GoalSchema = new mongoose.Schema({
    title: {type:String,trim:true,unique:true,required: [true, "can't be blank"],},
    description:{type: String,trim: true,required: [true, "can't be blank"],},
    status:{ type:String, enum:['NotStarted','Ongoing','Completed','Suspended','Cancelled']},
    createdOn: { type: Date, default: Date.now},
    createdBy:{type: mongoose.Schema.Types.ObjectId, ref:'User'},
    modifiedBy:{type: mongoose.Schema.Types.ObjectId,refer: 'User'},
    modifiedOn:Date,
    due:Date
});

GoalSchema.plugin(uniqueValidator, {message: 'is already taken.'});


GoalSchema.pre('save',function(next){
    this.modifiedOn=new Date();
    next();
});


GoalSchema.methods.setCreatedBy=function(createdBy){
    if(createdBy){      
        this.createdBy=createdBy
    }
}
GoalSchema.methods.setModifiedBy=function(modifiedBy){
    if(modifiedBy){      
        this.modifiedBy=modifiedBy
    }
}

GoalSchema.methods.setCreatedOn=function(createdOn){
    this.createdOn=createdOn;
}

GoalSchema.methods.setModifiedOn=function(lastModified){
    this.modifiedOn=lastModified;
}

GoalSchema.methods.updateStatus=function(newStatus){
    this.status=newStatus;
}



const Goal=mongoose.model('Goal',GoalSchema);
module.exports=Goal;