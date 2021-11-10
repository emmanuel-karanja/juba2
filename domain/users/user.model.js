const config=require('../../config');
const mongoose=require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt=require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const jwtSecret=config.jwtSecret;

const UserSchema = new mongoose.Schema({
    firstName: {type:String,trim:true,required: [true, "can't be blank"],lowercase:true},
    lastName:{type: String,trim: true,required: [true, "can't be blank"],lowercase:true},
    image: {type:String,default:'https://static.productionready.io/images/smiley-cyrus.jpg'},
    email: {type: String, unique:true, index:true,required: [true, "can't be blank"],
             match: [/\S+@\S+\.\S+/, 'is invalid'],lowercase:true},
    password: { type: String, required: true},
    salt:String,
    createdOn: { type: Date, default: Date.now},
    createdBy:{type: mongoose.Schema.Types.ObjectId,ref: 'User'},
    modifiedBy:{type: mongoose.Schema.Types.ObjectId,ref: 'User'},
    modifiedOn:Date,
    role: String,
    active: {type:Boolean, default:true},
    blocked:{type: Boolean, default:false},
    lastLogin:Date,
    provider:{type: String, default:'default-local'}
});

UserSchema.plugin(uniqueValidator, {message: 'is already taken.'});

UserSchema.statics.getUserByEmail=function(email,callback){
    this.findOne({email:new RegExp(email,'i')},callback)
}

UserSchema.pre('save',function(next){
    this.modifiedOn=new Date();
    next();
});


UserSchema.virtual('fullName').get(function(){
    return this.firstName +' '+ this.lastName;
}).set(function(fullName){
    let splitName=fullName.split(' ');
    this.firstName=splitName[0] || '';
    this.lastName=splitName[1] || '';
});


UserSchema.methods.setPassword=function(password){
    if(this.password){
        const saltRounds=12;
        this.salt = bcrypt.genSaltSync(saltRounds);
        this.password = this.hashPassword(this.password);
    }
}

UserSchema.methods.hashPassword=function(password){
    return bcrypt.hashSync(password,this.salt);
}

UserSchema.methods.authenticate=function(password){
    return this.password ===this.hashPassword(password);
};

UserSchema.methods.setLastLogin=function(lastLogin){
    this.lastLogin=lastLogin;
}
UserSchema.methods.generateJWT = function() {
    const today = new Date();
    const expiry = new Date(today);
    expiry.setDate(today.getDate() + 60);

    return jwt.sign({
        id: this._id,
        fullName: this.fullName,
        email:this.email,
        expiry: parseInt((expiry.getTime()) / 1000),
    }, jwtSecret);
};

UserSchema.methods.authUser =function(){
    return {
        _id:this._id,
        fullName:this.fullName,
        email: this.email,
        image: this.image || 'https://static.productionready.io/images/smiley-cyrus.jpg',
        token: this.generateJWT(),
    };
};

UserSchema.methods.toProfileUser=function(){
    return{
        _id: this._id,
        fullName: this.fullName,
        email: this.email,
        image: this.image || 'https://static.productionready.io/images/smiley-cyrus.jpg',
        role: this.role,
        active: this.active,
        blocked:this.blocked,
        lastLogin:this.lastLogin,
    }
}

UserSchema.methods.activate=function(){
        this.active=true;
}

UserSchema.methods.deActivate=function(){
        this.active=false;
}

UserSchema.methods.isActive=function(){
    return this.active;
}

UserSchema.methods.block=function(){
    this.blocked=true;
}

UserSchema.methods.unBlock=function(){
        this.blocked=false;
}

UserSchema.methods.isBlocked=function(){
    return this.blocked;
}

UserSchema.methods.updateRole=function(newRole){
    this.role=newRole;
}

//helper for getting a user's gravatar
UserSchema.methods.gravatar=function(size){
    if (!size) {
        size = 200;
      }
      if (!this.email) {
        return `https://gravatar.com/avatar/?s=${size}&d=retro`;
      }
      const md5 = crypto.createHash('md5').update(this.email).digest('hex');
      return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
}

const User=mongoose.model('User',UserSchema);
module.exports=User;