require('dotenv').config();

const mongoose=require('./loaders/mongoose');
const {createExpressApp} = require('./loaders/express');
const {setupGraphQLHandler}=require('./loaders/graphql');

const db = mongoose();

console.log('MongoDB Connected...');
const app = createExpressApp();
//this is an already configured express server object


setupGraphQLHandler(app);


const port=process.env.PORT || 3000;
app.listen(port);


module.exports=app;
console.log(`Server listening on port: ${port}`);
