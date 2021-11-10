const config=require('../../config');
const jwt = require('jsonwebtoken');
const {userService}=require('../../api/graphql/users')

const jwtSecret = config.jwtSecret;

const getTokenFromHeader=(req)=>{
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token' ||
        req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1];
    } 
    return null;
  }

exports.getUser=async(req)=> {
  const token = getTokenFromHeader(req);
  if (!token) return null;
  try {
    //obtain the user id from the token and use it to obtain user from the db
    //here,JWT signing uses email and user id.
    //you can use the email too if you wish
    const {id} = jwt.verify(token, jwtSecret);
    const user=await userService.getUserById(id);
    if(!user)
       throw new Error('Authentication failed, user not found!');
    return {currentUser:user.toProfileUser()};
  } catch (error) {
    console.log(error);
    return null;
  }
}


exports.resolveUser=(parent, args, {currentUser}) =>{
  return {...currentUser,loggedIn:true};
}


