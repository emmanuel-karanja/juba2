function getErrorMessage(error){
    const { details } = error; 
    const message = details.map(i => i.message).join(',');
    return message;
}

module.exports=getErrorMessage;

