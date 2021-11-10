const fs=require('fs-extra');
const path=require('path');

const cwd = process.cwd();
const apiDir = path.join(cwd, 'api/REST/routes/');

export const setupRestRoutes=(app)=>{
    fs.readdirSync(apiDir).forEach((file) => {
     require(`./api/REST/routes/${file.substr(0, file.indexOf('.'))}.route`)(app);
   });
}
 
 